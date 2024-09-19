import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  isLoading: boolean = false

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

  myProduct!: Product
  constructor(private _ProductService: ProductService, private _ToastrService: ToastrService, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService) {

  }
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe((res: any) => {
      // console.log(res.params.pId);

      this._ProductService.getSpecificProduct(res.params.pId).subscribe({
        next: (res) => {
          console.log(res)
          this.myProduct = res.data
        },
        error: (err) => console.log(err)
      })
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
}
