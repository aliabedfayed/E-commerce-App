import { Component } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Categories } from '../../../shared/interfaces/categories';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  categoriesList: Categories[] = []

  constructor(private _CategoriesService: CategoriesService) { }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/categories')
    }

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.categoriesList = res.data;
      }, error: (err) => {
        console.log(err);

      }

    })

  }
}
