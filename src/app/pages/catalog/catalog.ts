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
  private sortBy$ = new BehaviorSubject<string>('name');

  // Filter options
  availableBrands: string[] = ['All Brands'];
  sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'vehicles-count', label: 'Most Compatible' },
    { value: 'vehicles-count-desc', label: 'Least Compatible' }
  ];

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

    // Set up filtered products stream
    this.filteredProducts$ = combineLatest([
      this.products$,
      this.searchTerm$,
      this.selectedBrand$,
      this.sortBy$
    ]).pipe(
      map(([products, searchTerm, selectedBrand, sortBy]) => {
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

        // Reorder vehicles to show matching ones first
        filtered = filtered.map(product => ({
          ...product,
          supportedVehicles: this.prioritizeMatchingVehicles(
            product.supportedVehicles, 
            searchTerm, 
            selectedBrand
          )
        }));

        // Sort
        filtered.sort((a, b) => {
          switch (sortBy) {
            case 'name':
              return a.name.localeCompare(b.name);
            case 'name-desc':
              return b.name.localeCompare(a.name);
            case 'vehicles-count':
              return b.supportedVehicles.length - a.supportedVehicles.length;
            case 'vehicles-count-desc':
              return a.supportedVehicles.length - b.supportedVehicles.length;
            default:
              return 0;
          }
        });

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

  get sortBy(): string {
    return this.sortBy$.value;
  }

  set sortBy(value: string) {
    this.sortBy$.next(value);
  }

  // Check if any filters are active
  get hasActiveFilters(): boolean {
    return this.searchTerm$.value.trim() !== '' ||
      this.selectedBrand$.value !== '' ||
      this.sortBy$.value !== 'name';
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
    this.sortBy$.next('name');
  }

  // Method to prioritize matching vehicles in the display
  private prioritizeMatchingVehicles(
    vehicles: Vehicle[], 
    searchTerm: string, 
    selectedBrand: string
  ): Vehicle[] {
    if (!searchTerm.trim() && !selectedBrand) {
      return vehicles; // No filters, return original order
    }

    const search = searchTerm.toLowerCase().trim();
    const brand = selectedBrand && selectedBrand !== 'All Brands' ? selectedBrand : '';

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

    return false;
  }

  // Get visible vehicles based on active filters
  getVisibleVehicles(vehicles: Vehicle[]): Vehicle[] {
    // Show more vehicles when filters are active to display matching results
    const maxVisible = this.hasActiveFilters ? 6 : 3;
    return vehicles.slice(0, maxVisible);
  }

  // Get count of remaining vehicles
  getRemainingVehiclesCount(vehicles: Vehicle[]): number {
    const maxVisible = this.hasActiveFilters ? 6 : 3;
    return Math.max(0, vehicles.length - maxVisible);
  }
}