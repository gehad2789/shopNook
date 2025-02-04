import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ProductService } from '../../../services/productservice/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  productsList: any[] = []; 
  filteredProducts: any[] = [];
  catList: any[] = [];
  cartlist: any[] = [];

  searchTerm: string = ''; 
  private searchSubject = new Subject<string>();

  @Output() searchResults: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor(private prdservice: ProductService, private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getallcat();
    this.cartlist = this.cartService.getCart();

    // Debounce search input to avoid excessive calls
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((term) => {
      this.filterProducts(term);
    });
  }

  getAllProducts() {
    this.prdservice.getAllProducts().subscribe(
      (data: any) => {
        // Use Map to filter out products with duplicate image URLs
        const uniqueProducts = Array.from(
          new Map(data.map((item: any) => [item.productImageUrl, item])).values()
        );
        
  
        this.productsList = uniqueProducts.sort(()=>Math.random()-0.5);

      },
      error => console.error('Error fetching products:', error)
    );
  


  }

  getallcat() {
    this.prdservice.getAllCat().subscribe(
      (data: any) => this.catList = data.data || [],  
      error => console.error('Error fetching categories:', error)
    );
  }

  navigate(id: number) {
    this.router.navigate(['/catproducts', id]);
  }

    onSearchChange(): void {
      if (!this.searchTerm.trim()) {
        this.filteredProducts = [...this.productsList]; // Reset to original order
      } else {
        const lowerSearch = this.searchTerm.toLowerCase();
        this.filteredProducts = [...this.productsList].sort((a, b) => {
          const aMatch = a.productName.toLowerCase().includes(lowerSearch) ? -1 : 1;
          const bMatch = b.productName.toLowerCase().includes(lowerSearch) ? -1 : 1;
          return aMatch - bMatch;
        });
      }
    }
  
  


  filterProducts(term: string): void {
    console.log('Search term:', term);
    this.filteredProducts = [];

    console.log('Products List before filtering:', this.productsList);
  
    if (!Array.isArray(this.productsList)) {//check if it array or not
      console.error('productsList is not an array:', this.productsList);
      return;
    }
  
    if (!term.trim()) {//not empty 
      this.filteredProducts = [...this.productsList];/*If the term is empty, the function assigns a copy of 
      the entire productsList to filteredProducts using the spread operator (...  ,ensures that all products are
       included in the filtered results when no search term is provided.

*/
    } else {
      /*toLowerCase() converts both the productName and the search term to lowercase to ensure the search is case-insensitive.

includes() checks if the productName contains the search term.
*/
      this.filteredProducts = this.productsList.filter(product =>
        product?.productName?.toLowerCase().includes(term.toLowerCase())
      );
    }
  
    console.log('Filtered Products:', this.filteredProducts);
    this.searchResults.emit(this.filteredProducts);//notify parent components or services about the filtered results immeditly[any change]
  }

  
  

}
