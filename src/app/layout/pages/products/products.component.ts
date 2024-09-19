import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { Product } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, FilterPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnDestroy {

  searchTerm: string = ""

  productSub!: Subscription

  isLoading: boolean = false


  productList: Product[] = []

  constructor(private _ProductService: ProductService, private _CartService: CartService, private _ToastrService: ToastrService) { }



  ngOnInit() {


    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/product')
    }

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
