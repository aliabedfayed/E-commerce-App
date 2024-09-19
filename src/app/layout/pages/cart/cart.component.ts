import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { Cart } from '../../../shared/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  myCart!: Cart
  constructor(private _CartService: CartService, private _ToastrService: ToastrService) { }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/cart')
    }

    this._CartService.getCart().subscribe({
      next: (res) => {
        console.log(res);
        this.myCart = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateQuantity(productId: string, productCount: number) {
    this._CartService.updateProductQuantity(productId, productCount.toString()).subscribe({
      next: (res) => {
        console.log(res);
        this.myCart = res
        this._ToastrService.success("Cart Updated");
      },
      error: (err) => {
        console.log(err);
      }
    }
    )
  }
  removeItem(productId: string) {
    this._CartService.removeSpecItem(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.myCart = res
        this._ToastrService.error("Item deleted");
        this._CartService.cartNum.next(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message == "success") {
          this.myCart = {} as Cart
          this._CartService.cartNum.next(0)
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
