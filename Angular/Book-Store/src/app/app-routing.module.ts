import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';
import { DeskBoardComponent } from './desk-board/desk-board.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegisterComponent } from './register/register.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'addToCart',
    component: AddToCartComponent
  },
  {
    path: 'userProfile',
    component: UserProfileComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'bookDetail/:_id',
    component: BookDetailComponent
  },
  {
    path: 'forgotPass',
    component: ForgotPassComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'updatePass',
    component: UpdatePassComponent
  },
  {
    path: 'deskBoard',
    component: DeskBoardComponent
  },
  {
    path: 'sidebar',
    component: SidebarComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
