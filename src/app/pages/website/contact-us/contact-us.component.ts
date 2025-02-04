import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../services/loginservice/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [RouterOutlet,FormsModule,NgIf],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  constructor(private logsrv:LoginService, private snakBar:MatSnackBar){}
   formData :any= {
    username: 'emilys',
    email: 'emily@example.com',
    message: 'Hello, this is a test message.'
  };
  sendData(form:NgForm): void {
    if (form.valid) {
      // Form is valid, send data to the server or handle it
      console.log('Form Data:', this.formData);

      // Reset the form after submission
      form.resetForm();
      this.snakBar.open('Message sent successfully!', 'close',{
        panelClass: ['snackbar-error'],
            verticalPosition: 'top',     

      });
    } else if(form.invalid) {
      // Form is invalid, show error messages
      // alert('Please fill out the form correctly.');
    }



    this.logsrv.postData(this.formData).subscribe(
      response => {

        if(response){
          this.snakBar.open('Added new product successfully', 'Close', {
            panelClass: ['snackbar-success'],
            
          });
        } else if (response.error) {
          // Show error notification
            this.snakBar.open(response.message || 'Failed to add product', 'Close', {
            panelClass: ['snackbar-error'],
          });

        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }






}
