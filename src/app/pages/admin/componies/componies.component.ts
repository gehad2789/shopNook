import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../website/header/header.component";
import { FooterComponent } from "../../website/footer/footer.component";
import { CommonModule } from '@angular/common';
import { CompaniesService, Company } from '../../../services/companies.service';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'app-componies',
  standalone: true,
  imports: [  CommonModule, RouterOutlet, LayoutComponent],
  templateUrl: './componies.component.html',
  styleUrl: './componies.component.css'
})
export class ComponiesComponent implements OnInit {

  companies!:Company[];
  constructor(private companserv:CompaniesService){}
  ngOnInit(): void {
    this.companserv.getCompanies().subscribe((data)=>{
      this.companies=data.companies
    },
    (error) => {
      console.error('Error fetching companies:', error);
    }
  )
  };













  









  


}
