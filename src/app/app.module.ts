import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { ApphomePage } from '../pages/apphome/apphome';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/account/account';
import { ProductsByCategoryPage } from '../pages/products/product.category';
import { ProductDetailPage } from '../pages/products/product.details';
import { CartPage } from '../pages/cart/cart';
import { ChekoutPage } from '../pages/checkout/checkout';
import { RateusPage } from '../pages/rateus/rateus';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { SharePage } from '../pages/share/share';
import { FeedbackPage } from '../pages/feedback/feedback';
import { AddressPage } from '../pages/address/address';
import { ImageModal } from '../components/image-modal/image-modal';



import { AuthService } from '../providers/auth-provider/auth-service';
import { ScrollableTabs } from '../components/scrollable-tabs/scrollable-tabs';
import { ProductService } from '../providers/product-provider/ProductService';
import { ConnectivityService } from '../providers/connection-provider/connectivity.service';
import { StorageService } from '../providers/services/storage.service';
import { CategoryService}  from '../providers/category-provider/category';
import { CartProvider } from '../providers/cart-provider/cart-provider';
import { UtilProvider } from '../providers/util-provider/util-provider';
import { StorageProvider } from '../providers/storage-provider/storage-provider';


import { Storage } from '@ionic/storage';


import { CustomIconsModule } from 'ionic2-custom-icons';


export function provideStorage() {
  return new Storage(['sqlite', 'websql', 'indexeddb'], { name: '__mydb' });
}

@NgModule({
  declarations: [
    MyApp,
    ApphomePage,
    HomePage,
    LoginPage,
    MapPage,
    TabsPage,
    ScrollableTabs,
    SettingsPage,
    AccountPage,
    ProductsByCategoryPage,
    ProductDetailPage,
    CartPage,
    ChekoutPage,
    ImageModal,
    AboutusPage,
    RateusPage,
    SharePage,
    FeedbackPage,
    AddressPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CustomIconsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ApphomePage,
    HomePage,
    LoginPage,
    MapPage,
    TabsPage,
    SettingsPage,
    AccountPage,
    ProductsByCategoryPage,
    ProductDetailPage,
    CartPage,
    ChekoutPage,
    ImageModal,
    AboutusPage,
    RateusPage,
    SharePage,
    FeedbackPage,
    AddressPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler,useFactory: provideStorage},
  ProductService,
  AuthService,
  CategoryService,
  ConnectivityService,
  Storage,
  StorageService,
  CartProvider,
  UtilProvider,
  StorageProvider
  ]
})
export class AppModule {}
