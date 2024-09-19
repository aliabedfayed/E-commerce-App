import { Product } from './../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../base/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartNum: BehaviorSubject<number> = new BehaviorSubject(0)


  constructor(private _HttpClient: HttpClient) { }

  addProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": productId
      })
  }

  updateProductQuantity(productId: string, pCount: string): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${productId}`,
      {
        "count": pCount
      })
  }

  getCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }

  removeSpecItem(productId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${productId}`)
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }

}
