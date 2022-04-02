import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HostListener, OnDestroy } from '@angular/core';
import { LoginPage } from '../login/login.page';
@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.page.html',
  styleUrls: ['./modalpopup.page.scss'],
})
export class ModalpopupPage implements OnInit,OnDestroy {
  opt: string = '';
  constructor(
    private modalController: ModalController,
    public alertController: AlertController,
    private httpclient: HttpClient
  ) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  user = {
    verification_code: "5123"
  };
  ngOnInit() {
    const modalState = {
      modal: true,
      desc: 'fake state for our modal',
    };
    history.pushState(modalState, null);
  }

  ngOnDestroy() {
    if (window.history.state.modal) {
      history.back();
    }
  }

  @HostListener('window:popstate', ['$event'])
  dismissModal() {
    this.modalController.dismiss();
  }


  closeAlert() {
    this.modalController.dismiss();
  }

  onOtpChange(event: any) {
    this.opt = event;
    // console.log(this.opt);
  }

  async postresponse() {
    if (this.opt.length == 4) {
      this.user.verification_code = this.opt;
      this.httpclient
        .post<any>(
          'http://62.171.149.49:3501/verify_code',
          this.user,
        )
        .subscribe((res: any) => {
          console.log(res);
          if (res != null) {


          }
          if (res.length == 0) {
            this.showAlert('Incorrect verification code. Please login via website to see the verification code!');
          } else {
            // store the wallet address from response and show tick on login screen after dismissing the modal
            console.log(res[0].wallet_address);
            if (LoginPage.selectedWallet == 'wax') {
              LoginPage.walletAddress = res[0].wallet_address;
            }
            else if (LoginPage.selectedWallet == 'phantom') {
              LoginPage.phantomWalletAddress = res[0].wallet_address;
            }
            this.modalController.dismiss();
          }
        });
    } else {
      this.showAlert('Please enter OTP first');
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
