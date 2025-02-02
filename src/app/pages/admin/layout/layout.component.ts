import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CompaniesService } from '../../../services/companies.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

 


}
