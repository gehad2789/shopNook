import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    // Dynamically adding controls for registration
    this.addControl('name', '', [Validators.required]);
    this.addControl('password', '', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(18),
      Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
    ]);
    this.addControl('confirmPassword', '', [Validators.required]);
    
    // Custom validator to check if passwords match
    this.form.get('confirmPassword')?.setValidators([
      Validators.required,
      this.passwordsMatchValidator.bind(this)
    ]);
  }

  addControl(name: string, value: any, validators: any[] = []): void {
    const control = new FormControl(value, validators);
    this.form.addControl(name, control);
  }

  // Custom password match validator
  passwordsMatchValidator(control: FormControl): { [key: string]: boolean } | null {
    if (control.value !== this.form?.get('password')?.value) {
      return { mustMatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Registration Form Data:', this.form.value);
      // Proceed with registration logic (send data to server, etc.)
      // For now, just navigate to login page or another page after successful registration.
      this.router.navigateByUrl('/login');
    }
  }

  navigateToLogin(): void {
    // Navigate to login page if the user clicks on "Login"
    this.router.navigateByUrl('/login');
  }

}
