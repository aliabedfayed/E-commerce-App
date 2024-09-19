import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../base/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private HttpClient: HttpClient) { }

  getAllBrands(): Observable<any> {
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/brands`);
  }
}
