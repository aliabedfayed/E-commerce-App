import { Data } from './../../../shared/interfaces/cart';
import { Component } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { Brands } from '../../../shared/interfaces/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  brandsList: Brands[] = []

  constructor(private _BrandsService: BrandsService) { }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/brands')
    }


    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandsList = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
