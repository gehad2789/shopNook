import { Component } from '@angular/core';
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

}
