import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-chekout',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './chekout.component.html',
  styleUrl: './chekout.component.css'
})
export class ChekoutComponent {
  constructor(private snakBar:MatSnackBar){}
  confirmpayment:boolean=false;

  showModal(){

    this.confirmpayment=true;
    setTimeout(() => {
      this.confirmpayment = false;

    }, 2500); // Adjust the time in milliseconds as needed

    this.snakBar.open('Your Order In The Way', 'Close', {
      panelClass: ['snackbar-success'],
    });
  };

  
  closeModal(){
    this.confirmpayment=false
  }

}
