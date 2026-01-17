import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//uvoz ForumsModule
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Footer } from './shared/components/footer/footer/footer';
import { Header } from './shared/components/header/header/header';
import { Login } from './features/authentication/pages/login/login/login';
import { Signup } from './features/authentication/pages/signup/signup/signup';
import { ItemsDetails } from './features/items/pages/items-details/items-details/items-details';
import { ItemsOverview} from './features/items/pages/items-overview/items-overview/items-overview';
import { Basket } from './features/items/pages/basket/basket/basket';
import { Checkout } from './features/items/pages/checkout/checkout';

@NgModule({
  declarations: [
    App,
    Footer,
    Header,
    Login,
    Signup,
    ItemsDetails,
    ItemsOverview,
    Basket,
    Checkout
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
