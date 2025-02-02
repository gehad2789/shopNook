import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-cart',
  standalone: true,
  imports: [NgFor, DatePipe, NgIf, RouterOutlet],
  templateUrl: './custom-cart.component.html',
  styleUrl: './custom-cart.component.css'
})
export class CustomCartComponent {
  ProductsItems: any[] = []; //products added to cart

  constructor( private cartserv:CartService, private snakBar:MatSnackBar ){}
  
  ngOnInit(): void {
    this.ProductsItems = this.cartserv.getCart(); // Fetch cart items on initialization
  }

  deleteitem(itemId:any){
    this.cartserv.removeFromCart(itemId);
    setTimeout(() => {
      this.snakBar.open('Deleted the item from Cart', 'Close', {
        panelClass: ['snackbar-success']
      });
    }, 3000); // 3000 milliseconds = 3 seconds
    window.location.reload()

  
      
    

  }


  };
  



