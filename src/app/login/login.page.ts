import { Component, OnInit } from '@angular/core';
import * as waxjs from '@waxio/waxjs/dist';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalpopupPage } from '../modalpopup/modalpopup.page';
import { Connection } from '@metaplex/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata/dist/src/accounts/Metadata';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  waxConnected: boolean = false;
  phantomConnected: boolean = false;
  name: any;
  arr: any = {};
  static walletAddress = '';
  static phantomWalletAddress = '';
  static selectedWallet = '';
  static URIdata: any;
  xyz: any = [];
  static finalvar: any = {};
  static phantomassets: any = [];

  options = {
    headers: Headers,
    observe: 'response' as 'body',
    responseType: 'json',
  };

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  user = {
    username: 'ali_haider1793@yahoo.com',
    password: 'Admin123!@#',
  };
  
  wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com',
  });

  constructor(
    private httpclient: HttpClient,
    private router: Router,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private storage: Storage
  ) {
    this.waxConnected = false;
    LoginPage.walletAddress = '';
  }

  async ngOnInit() {
    await this.storage.create();
  }

  ionViewDidEnter() {
    if (LoginPage.walletAddress != '') {
      this.waxConnected = true;
    } else {
      this.waxConnected = false;
    }
  }

  async openModal(selected: string) {
    LoginPage.selectedWallet = selected;
    const modal = await this.modalCtrl.create({
      component: ModalpopupPage,
      cssClass: 'small-modal',
    });
    modal.onDidDismiss().then(async () => {
      if (LoginPage.walletAddress != '') {
        this.waxConnected = true;
      }
      if (LoginPage.phantomWalletAddress != '') {
        this.phantomConnected = true;
      }
      if (
        LoginPage.walletAddress == '' &&
        LoginPage.phantomWalletAddress == ''
      ) {
        this.waxConnected = false;
        this.phantomConnected = false;
      }

      await this.storage
        .set('wallets', {
          waxAddress: LoginPage.walletAddress,
          phantomAddress: LoginPage.phantomWalletAddress,
        })
        .then(
          (data) => console.log('Stored wallet item!', data),
          (error) => console.log('Error storing wallet item', error)
        );

  
    });
    await modal.present();
  }

  goToHomePage() {
    if (this.waxConnected == true || this.phantomConnected == true) {
      this.router.navigateByUrl('home-page');
    } else {
      this.showAlert('Connect a wallet before you continue!');
    }
  }

  async showAlert(msg: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Attention',
      subHeader: 'Crypto Quest',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
