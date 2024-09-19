import { Component, OnDestroy } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Category } from '../../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../shared/services/cart.service';
import { Product } from '../../../shared/interfaces/product';
import { ProductService } from '../../../shared/services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, CurrencyPipe, FilterPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  searchTerm: string = ""

  productSub!: Subscription
  isLoading: boolean = false

  productList: Product[] = []

  categoriesList: Category[] = []

  constructor(private _CategoriesService: CategoriesService, private _CartService: CartService, private _ProductService: ProductService, private _ToastrService: ToastrService) { }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/home')
    }

    this._CategoriesService.getAllCategories().subscribe((res) => this.categoriesList = res.data);

    this.productSub = this._ProductService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data
      },
      error(err) {
        console.log(err);

      },
    })

  }


  addProduct(pId: string) {

    this.isLoading = true
    this._CartService.addProductToCart(pId).subscribe({
      next: (res) => {

        this._CartService.cartNum.next(res.numOfCartItems)
        // console.log(res.numOfCartItems);
        this.isLoading = false
        this._ToastrService.success(res.message);

      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }


  ngOnDestroy(): void {
    this.productSub?.unsubscribe
  }
}
