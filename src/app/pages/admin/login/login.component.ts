import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';


export interface User {//login interface
  name: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    // Dynamically adding controls based on the form fields
    this.addControl('name', '', [Validators.required]);
    this.addControl('password', '', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(18),
      Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
    ]);
  }

  addControl(name: string, value: any, validators: any[] = []): void {
    const control = new FormControl(value, validators);
    this.form.addControl(name, control);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value  );
      //1- login --if admin-->products[which layout is its parent[appear  first then products]]
      if(this.form.value.name=='Admin'&&this.form.value.password=='123abc45678'){
        this.router.navigateByUrl('/products')

      }
      // Handle the form submission logic
    } else {
      ;
    }
  }

 
  


}
