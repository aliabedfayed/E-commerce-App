import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { NotFoundComponent } from './layout/additions/not-found/not-found.component';
import { ForgetpasswordComponent } from './layout/additions/forgetpassword/forgetpassword.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { CheckoutComponent } from './layout/additions/checkout/checkout.component';
import { authGuard } from './shared/guard/auth.guard';
import { isLoggedInGuard } from './shared/guard/is-logged-in.guard';

export const routes: Routes = [
    { path: '', redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent, title: "home", canActivate: [authGuard] },
    { path: "login", component: LoginComponent, title: "login", canActivate: [isLoggedInGuard] },
    { path: "register", component: RegisterComponent, title: "register", canActivate: [isLoggedInGuard] },
    { path: "product", component: ProductsComponent, title: "product", canActivate: [authGuard] },
    { path: "brands", component: BrandsComponent, title: "brands", canActivate: [authGuard] },
    { path: "categories", component: CategoriesComponent, title: "categories", canActivate: [authGuard] },
    { path: "cart", component: CartComponent, title: "cart", canActivate: [authGuard] },
    { path: "forgetPassword", component: ForgetpasswordComponent, title: "forgetpassword", canActivate: [isLoggedInGuard] },
    { path: "productDetails/:pId", component: ProductDetailsComponent, title: "productdetails", canActivate: [authGuard] },
    { path: "checkout/:cId", component: CheckoutComponent, title: "checkout", canActivate: [authGuard] },
    { path: "**", component: NotFoundComponent }
];
