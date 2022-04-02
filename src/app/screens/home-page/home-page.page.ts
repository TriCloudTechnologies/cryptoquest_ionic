import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  waxConnected: boolean = false;
  phantomConnected: boolean = false;
  diceselection: boolean = false;

  static waxAddress = '';
  static phantomAddress = '';

  constructor(private router: Router, private storage: Storage) {}

  ionViewWillEnter() {
    this.storage.get('wallets').then(
      (data) => {
        if (data.waxAddress != '') {
          this.waxConnected = true;
          HomePagePage.waxAddress = data.waxAddress;
        } else {
          this.waxConnected = false;
        }
        if (data.phantomAddress != '') {
          HomePagePage.phantomAddress = data.phantomAddress;
          this.phantomConnected = true;
        } else {
          this.phantomConnected = false;
        }
        console.log(
          'wax connected ' +
            this.waxConnected +
            ' and phantom connected ' +
            this.phantomConnected
        );
      },
      (error) => console.error(error)
    );
  }

  ngOnInit() {}
  goToCharacterHome() {
    this.router.navigateByUrl('character-home');
  }
  goToDiceHome() {
    this.router.navigateByUrl('dice-home');
  }
}
