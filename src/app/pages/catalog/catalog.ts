import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/products';
import { ProductService } from '../../core/services/product.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  template: `
    <div class="container">
      <h1 class="title">Catalog</h1>

      <div *ngIf="products$ | async as products; else loading">
        <div *ngFor="let product of products" class="product-card">
          <img
            *ngIf="product.imageUrl"
            [src]="product.imageUrl"
            alt="{{ product.name }}"
            class="product-image"
          />
          <div class="product-info">
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>

            <h4>Supported Vehicles:</h4>
            <ul>
              <li *ngFor="let v of product.supportedVehicles">
                {{ v.fullName }}
              </li>
            </ul>

            <h4>Service Types:</h4>
            <div class="chips">
              <span *ngFor="let type of product.serviceTypes" class="chip">
                {{ type }}
              </span>
            </div>

            <a [routerLink]="['/catalog', product.id]" class="view-btn">
              View Details
            </a>
          </div>
        </div>
      </div>

      <ng-template #loading>
        <p>Loading products...</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 2rem;
      }
      .title {
        text-align: center;
        margin-bottom: 2rem;
      }
      .product-card {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 10px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }
      .product-image {
        width: 150px;
        height: 100px;
        object-fit: cover;
        border-radius: 6px;
      }
      .product-info h2 {
        margin: 0 0 0.5rem 0;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }
      .chip {
        background-color: #007bff;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 16px;
        font-size: 0.85rem;
      }
      .view-btn {
        display: inline-block;
        margin-top: 0.5rem;
        color: #007bff;
        text-decoration: underline;
        cursor: pointer;
      }
    `
  ],
  imports: [CommonModule, RouterModule]
})
export class CatalogPage implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }
}