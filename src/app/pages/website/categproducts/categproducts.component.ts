import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/productservice/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categproducts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categproducts.component.html',
  styleUrl: './categproducts.component.css'
})
export class CategproductsComponent implements OnInit{
  filteredProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const categoryId = id !== null ? +id : 0; // Default to 0 or any other value if id is null
    console.log('Category ID from route:', categoryId);
  
    this.productService.getAllProducts().subscribe((products) => {
      console.log('All products:', products);
  
      this.filteredProducts = products.filter(
        (product:any) => product.categoryId === categoryId
      );
      console.log('Filtered products:', this.filteredProducts);
    });

  }


}
