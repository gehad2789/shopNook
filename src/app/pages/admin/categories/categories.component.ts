import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/productservice/product.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [AsyncPipe, NgFor, CommonModule, LayoutComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  products$!:Observable<any >;
  constructor(private prdservice:ProductService){}

  ngOnInit(): void {
    this.getallcat();
  }


  getallcat(){
    this.products$ = this.prdservice.getAllCat().pipe(
      map((item: any) => {
        return item.data;
      })
    );
    console.log(this.products$)

  }

}
