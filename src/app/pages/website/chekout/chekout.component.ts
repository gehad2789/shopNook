import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  

@Component({
  selector: 'app-chekout',
  standalone: true,
  imports: [RouterOutlet, NgIf, NgFor, FormsModule, HttpClientModule, ReactiveFormsModule, NgClass],
  templateUrl: './chekout.component.html',
  styleUrl: './chekout.component.css'
})
export class ChekoutComponent implements OnInit {
  billingForm: FormGroup | any; 
  contries: any = [];
  contriesList: any = [];
  selectedCountry: string = '';
  cities: any[] = [];
  selectedCity: string = '';
  confirmpayment: boolean = false;

  productItems: any[] = [];
  discountPercentage: number = 9; // Discount as percentage (9%)
  discount: number = 9/100; // Actual discount amount
  shippingCharge: number = 20; // Shipping charge
  subtotal: number = 0; // Subtotal of the cart
  total: number = 0; // Total amount after calculations
  showDetails: boolean = false;

  constructor(private snakBar: MatSnackBar, private cartserv: CartService, private fb: FormBuilder) {
    this.getContries();
    this.initializeForm(); // Initialize the form
  }

  ngOnInit(): void {
    this.productItems = this.cartserv.getCart(); // Get cart items from service
    console.log(this.productItems.length)
    this.calculateSubtotal(); // Calculate subtotal
    this.calculateDiscount(); // Calculate discount
    this.calculateTotal(); // Calculate total
  }

  initializeForm() {
    this.billingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      paymentmethod: ['', Validators.required], // Ensure payment method is required
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]]
    });
  }

    // Handle payment method change
    onPaymentMethodChange(method: string) {
      this.billingForm.get('paymentmethod').setValue(method);
    }

  getContries() {
    this.cartserv.getAllContries().subscribe(
      (data: any) => {
        this.contries = data;
        this.contriesList = Object.keys(data); // Extract country names for the dropdown
      },
      error => console.error('Error fetching countries:', error)
    );
  }

  onCountrySelect() {
    this.selectedCountry = this.billingForm.get('country').value;
    if (this.selectedCountry) {
      this.cities = this.contries[this.selectedCountry]; // Get cities for the selected country
      this.billingForm.get('city').reset(); // Reset city selection when country changes
    } else {
      this.cities = []; // Clear cities if no country is selected
    }
  }

  calculateSubtotal() {
    this.subtotal = this.productItems.reduce((acc, item) => acc + (item.productPrice * item.Quantity), 0) + this.shippingCharge;
    if(this.productItems.length===0){
      this.subtotal=0;
    }
  }

  calculateDiscount() {
    this.discount = (this.subtotal * this.discountPercentage) / 100;
    if(this.productItems.length===0){
      this.discount=0;
    }
  }

  calculateTotal() {
    this.total = this.subtotal - this.discount + this.shippingCharge;
    if(this.productItems.length===0){
      this.total=0;
    }
  }

  onSubmit() {
      console.log('Form Valid:', this.billingForm.valid); // Debugging
      if (this.billingForm.valid) {
        this.showModal();
      } else {
        console.log('Form is invalid');
        this.markFormGroupTouched(this.billingForm); // Mark all fields as touched to show validation errors
        console.log('Form Errors:', this.billingForm.errors);
console.log('Form Controls:', this.billingForm.controls);
      }
    
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  clearcart() {
    this.cartserv.clearCart();
  }

  showdetail() {
    this.showDetails = true;
  }

  showModal() {
    this.confirmpayment = true;

    setTimeout(() => {
      this.confirmpayment = false;
      this.snakBar.open('Your Order Is On The Way', 'Close', {
        panelClass: ['snackbar-success'],
      });
      this.clearcart(); // Clear the cart after successful order
    }, 3000); // Adjust the time in milliseconds as needed
  }

  closeModal() {
    this.confirmpayment = false;
  }
}