import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { LayoutComponent } from "../layout/layout.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, CommonModule, LayoutComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent  {
  categories: { id: number; name: string }[] = [
    { id: 1, name: 'Beauty' },
    { id: 2, name: 'Foodgrains' },
    { id: 3, name: 'Drinks' },
    { id: 4, name: 'Snacks' },
    { id: 5, name: 'Cuts & Sprouts' },
    { id: 6, name: 'Art&Books' },
    { id: 7, name: 'Flower Bouquets' },
    { id: 8, name: 'Edible Oils' },
    { id: 9, name: 'Bakery Snacks' },
    { id: 10, name: 'Fruits' },
    { id: 11, name: 'Clothes' }
  ];

 



  addCategory(newCategory: string) {
    if (newCategory.trim()) {
      /*newCategory.trim() → Ensures the user does not add empty or whitespace-only names.
newId → Generates a new ID based on the last item's ID*/
      const newId = this.categories.length ? this.categories[this.categories.length - 1].id + 1 : 1;
      this.categories.push({ id: newId, name: newCategory });
    }
  }

  removeCategory(categoryId: number) {
    this.categories = this.categories.filter(category => category.id !== categoryId);
  }
}
