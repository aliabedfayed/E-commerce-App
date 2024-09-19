import { Component } from '@angular/core';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  cartItem!: number
  isLogin: boolean = false;
  constructor(private flowbiteService: FlowbiteService, private _CartService: CartService, private _AuthService: AuthService, private _Router: Router
  ) { }

  ngOnInit(): void {

    this._CartService.getCart().subscribe({
      next: (res) => {
        this._CartService.cartNum.next(res.numOfCartItems)
      }
    }
    )

    this._CartService.cartNum.subscribe((res) => {
      this.cartItem = res
    }
    )

    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });

    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() !== null) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    })

  }
  signOut() {
    localStorage.removeItem('userToken')

    this._AuthService.userData.next(null)

    this._Router.navigate(['/login'])
  }
}
