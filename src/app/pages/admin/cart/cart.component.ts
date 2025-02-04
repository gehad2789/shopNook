import { CommonModule, DatePipe, SlicePipe } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { ProductService } from '../../../services/productservice/product.service';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  productItems: any[] = []; // List of all products
  mostSoldProducts: any = []; // List of products sold this month

  constructor(private productserv:ProductService) {}

  ngOnInit(): void {
    // Fetch all products (this would ideally come from a service)
    this.fetchProductItems()
    // Filter products sold in the current month

  }
  fetchProductItems(): void {
    this.productserv.getProduct().subscribe(
      (data: any) => {
        this.productItems = data.data; // Assuming data.data contains the product list
        this.randomizeproducts();
      },
      error => console.error('Error fetching products:', error)
    );
  }

  randomizeproducts(){
    this.mostSoldProducts=this.productItems.sort(()=>
      Math.random()- .5).slice(0,6)
    /*Math.random() - 0.5 result means that elements are sometimes swapped and sometimes not, creating a randomized order for the array.*/

    }

  



}
