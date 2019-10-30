import { SanitizeHtmlPipe } from './user-profile/sanitize.html';
import { AmanPipe } from './pipes/aman.pipe';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from './services/auth-service.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';
import { DeskBoardComponent } from './desk-board/desk-board.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SaveBookComponent } from './save-book/save-book.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPassComponent,
    UpdatePassComponent,
    DeskBoardComponent,
    HeaderComponent,
    SidebarComponent,
    RegisterComponent,
    FooterComponent,
    BookDetailComponent,
    AmanPipe,
    AddToCartComponent,
    PaymentComponent,
    UserProfileComponent,
    SaveBookComponent,
    ListBooksComponent,
    SanitizeHtmlPipe

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatSliderModule
  ],
  providers: [
    AuthServiceService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
