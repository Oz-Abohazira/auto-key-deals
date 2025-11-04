import { Component, OnInit } from '@angular/core';
import { Observable, map, combineLatest, BehaviorSubject } from 'rxjs';
import { Product, Vehicle } from '../../core/models/products';
import { ProductService } from '../../core/services/product.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  standalone: true,
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
  imports: [CommonModule, RouterModule, FormsModule]
})
export class CatalogPage implements OnInit {
  products$!: Observable<Product[]>;
  filteredProducts$!: Observable<Product[]>;

  // Filter subjects for reactive filtering
  private searchTerm$ = new BehaviorSubject<string>('');
  private selectedBrand$ = new BehaviorSubject<string>('');
  private selectedModel$ = new BehaviorSubject<string>('');

  // Filter options
  availableBrands: string[] = ['All Brands'];
  availableModels: string[] = ['All Models'];

  // UI state: expanded vehicles per product
  private expandedProducts = new Set<number>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();

    // Extract unique brands from products
    this.products$.subscribe(products => {
      const brands = new Set<string>();
      products.forEach(product => {
        product.supportedVehicles.forEach(vehicle => {
          brands.add(vehicle.make);
        });
      });
      this.availableBrands = ['All Brands', ...Array.from(brands).sort()];
    });

    // Build available models dynamically based on products and selected brand
    combineLatest([this.products$, this.selectedBrand$]).subscribe(([products, selectedBrand]) => {
      const models = new Set<string>();
      products.forEach(product => {
        product.supportedVehicles.forEach(vehicle => {
          if (!selectedBrand || selectedBrand === 'All Brands' || vehicle.make === selectedBrand) {
            models.add(vehicle.model);
          }
        });
      });
      const list = Array.from(models).sort();
      this.availableModels = ['All Models', ...list];

      // If current selected model is no longer available (due to brand change), reset it
      const current = this.selectedModel$.value;
      if (current && !list.includes(current)) {
        this.selectedModel$.next('');
      }
    });

    // Set up filtered products stream
    this.filteredProducts$ = combineLatest([
      this.products$,
      this.searchTerm$,
      this.selectedBrand$,
      this.selectedModel$
    ]).pipe(
      map(([products, searchTerm, selectedBrand, selectedModel]) => {
        let filtered = [...products];

        // Search filter
        if (searchTerm.trim()) {
          const search = searchTerm.toLowerCase().trim();
          filtered = filtered.filter(product =>
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search) ||
            product.supportedVehicles.some(vehicle =>
              vehicle.make.toLowerCase().includes(search) ||
              vehicle.model.toLowerCase().includes(search) ||
              vehicle.year.toString().includes(search)
            )
          );
        }

        // Brand filter
        if (selectedBrand && selectedBrand !== 'All Brands') {
          filtered = filtered.filter(product =>
            product.supportedVehicles.some(vehicle =>
              vehicle.make === selectedBrand
            )
          );
        }

        // Model filter
        if (selectedModel && selectedModel !== 'All Models') {
          filtered = filtered.filter(product =>
            product.supportedVehicles.some(vehicle =>
              vehicle.model === selectedModel &&
              (!selectedBrand || selectedBrand === 'All Brands' || vehicle.make === selectedBrand)
            )
          );
        }

        // Reorder vehicles to show matching ones first
        filtered = filtered.map(product => ({
          ...product,
          supportedVehicles: this.prioritizeMatchingVehicles(
            product.supportedVehicles, 
            searchTerm, 
            selectedBrand,
            selectedModel
          )
        }));

        // Default sort by name for stable presentation
        filtered.sort((a, b) => a.name.localeCompare(b.name));

        return filtered;
      })
    );
  }

  // Getters for template binding
  get searchTerm(): string {
    return this.searchTerm$.value;
  }

  set searchTerm(value: string) {
    this.searchTerm$.next(value);
  }

  get selectedBrand(): string {
    return this.selectedBrand$.value;
  }

  set selectedBrand(value: string) {
    this.selectedBrand$.next(value);
  }

  get selectedModel(): string {
    return this.selectedModel$.value;
  }

  set selectedModel(value: string) {
    this.selectedModel$.next(value);
  }

  // Check if any filters are active
  get hasActiveFilters(): boolean {
    return this.searchTerm$.value.trim() !== '' ||
      this.selectedBrand$.value !== '' ||
      this.selectedModel$.value !== '';
  }

  getVehicleFullName(vehicle: Vehicle): string {
    let compatibleYears: string;

    if (vehicle.minYear && vehicle.minYear != vehicle.year) {
      compatibleYears = `${vehicle.minYear} - ${vehicle.year}`;
    } else {
      compatibleYears = `${vehicle.year}`;
    }

    return compatibleYears + ` ${vehicle.make} ${vehicle.model}`;
  }

  clearFilters() {
    this.searchTerm$.next('');
    this.selectedBrand$.next('');
    this.selectedModel$.next('');
  }

  // Method to prioritize matching vehicles in the display
  private prioritizeMatchingVehicles(
    vehicles: Vehicle[], 
    searchTerm: string, 
    selectedBrand: string,
    selectedModel: string
  ): Vehicle[] {
    if (!searchTerm.trim() && !selectedBrand && !selectedModel) {
      return vehicles; // No filters, return original order
    }

    const search = searchTerm.toLowerCase().trim();
    const brand = selectedBrand && selectedBrand !== 'All Brands' ? selectedBrand : '';
    const model = selectedModel && selectedModel !== 'All Models' ? selectedModel : '';

    // Separate matching and non-matching vehicles
    const matchingVehicles: Vehicle[] = [];
    const nonMatchingVehicles: Vehicle[] = [];

    vehicles.forEach(vehicle => {
      let isMatch = false;

      // Check if vehicle matches search term
      if (search && (
        vehicle.make.toLowerCase().includes(search) ||
        vehicle.model.toLowerCase().includes(search) ||
        vehicle.year.toString().includes(search)
      )) {
        isMatch = true;
      }

      // Check if vehicle matches selected brand
      if (brand && vehicle.make === brand) {
        isMatch = true;
      }

      // Check if vehicle matches selected model
      if (model && vehicle.model === model) {
        // Also respect brand if set; if brand is set, ensure make matches
        if (!brand || vehicle.make === brand) {
          isMatch = true;
        }
      }

      if (isMatch) {
        matchingVehicles.push(vehicle);
      } else {
        nonMatchingVehicles.push(vehicle);
      }
    });

    // Return matching vehicles first, then non-matching
    return [...matchingVehicles, ...nonMatchingVehicles];
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  // Check if a vehicle matches current filters (for highlighting)
  isVehicleMatching(vehicle: Vehicle): boolean {
    const search = this.searchTerm$.value.toLowerCase().trim();
    const brand = this.selectedBrand$.value;
    const model = this.selectedModel$.value;

    // If a model is selected, highlight only by model (ignore brand/search for highlight)
    if (model && model !== 'All Models') {
      return vehicle.model === model;
    }

    if (search && (
      vehicle.make.toLowerCase().includes(search) ||
      vehicle.model.toLowerCase().includes(search) ||
      vehicle.year.toString().includes(search)
    )) {
      return true;
    }

    if (brand && brand !== 'All Brands' && vehicle.make === brand) {
      return true;
    }
    if (model && model !== 'All Models' && vehicle.model === model) {
      if (!brand || brand === 'All Brands' || vehicle.make === brand) {
        return true;
      }
    }

    return false;
  }

  // Get visible vehicles based on active filters
  getVisibleVehicles(vehicles: Vehicle[], productId: number): Vehicle[] {
    if (this.isExpanded(productId)) {
      return vehicles;
    }
    // Show more vehicles when filters are active to display matching results
    const maxVisible = this.hasActiveFilters ? 6 : 3;
    return vehicles.slice(0, maxVisible);
  }

  // Get count of remaining vehicles
  getRemainingVehiclesCount(vehicles: Vehicle[], productId: number): number {
    if (this.isExpanded(productId)) {
      return 0;
    }
    const maxVisible = this.hasActiveFilters ? 6 : 3;
    return Math.max(0, vehicles.length - maxVisible);
  }

  // Expanded state helpers
  isExpanded(productId: number): boolean {
    return this.expandedProducts.has(productId);
  }

  toggleExpanded(productId: number): void {
    if (this.expandedProducts.has(productId)) {
      this.expandedProducts.delete(productId);
    } else {
      this.expandedProducts.add(productId);
    }
  }
}