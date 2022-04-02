import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { enableProdMode } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from 'ng-otp-input';
import { ModalpopupPageModule } from './modalpopup/modalpopup.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';

enableProdMode(); 

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    NgOtpInputModule,
    HttpClientModule,
    ModalpopupPageModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
    HttpClient,
    NativeStorage,
    Storage,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
