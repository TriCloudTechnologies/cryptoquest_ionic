import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HomePagePage } from '../home-page/home-page.page';

import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-dice-home',
  templateUrl: './dice-home.page.html',
  styleUrls: ['./dice-home.page.scss'],
})
export class DiceHomePage implements OnInit {
  static popuparray: any;
  public loading: boolean;
  iteration: any = [];
  public arr: any = {};
  public image: any;
  public displayimage: any;
  public text: any;
  public displayname: any;
  waxAddress = '';
  searchTerm: String;
  searchArray: any = [];
  searchName: any;
  constructor(
    private navCtrl: NavController,
    private router: Router,
    private httpclient: HttpClient,
    private storage: Storage
  ) {}

  ionViewWillEnter() {
    this.storage.get('wallets').then(
      (data) => {
        if (data.waxAddress != '') {
          this.waxAddress = data.waxAddress;
        }
      },
      (error) => console.error(error)
    );

    this.loading = false;
  }

  ionViewDidEnter() {
    this.httpclient
      .get(
        'https://atomic.wax.io/atomicassets/v1/assets?owner=' + this.waxAddress
      )
      .subscribe((res) => {
        this.arr = res['data'];
        //console.log('---------FULL ARRAY-------------------');
        //console.log(this.arr);
        for (let i = 0; i < this.arr.length; i++) {
          this.iteration.push(this.arr[i]['data']);
        }
        console.log('this is the iteration array');
        console.log(this.iteration);
        this.searchArray = this.iteration;
        console.log('this is searcharray');
        console.log(this.searchArray);

        DiceHomePage.popuparray = this.iteration;
        console.log('data for popup');
        console.log(DiceHomePage.popuparray);
        this.loading = true;
      });
  }
  ngOnInit() {}

  goToDiceDetails(p: any) {
    this.storage.set('detailsarray', p).then(
      (data) => {
        console.log('Stored first item!', data);
        this.iteration = [];
        this.router.navigateByUrl('dice-details');
      },
      (error) => console.error('Error storing item', error)
    );
  }
  goBack() {
    this.navCtrl.pop();
  }

  getItems(event: { target: { value: any } }) {
    this.searchName = event.target.value;
    this.searchArray = this.iteration.filter((result: any) => {
      var based = result.name
        .toLowerCase()
        .includes(this.searchName.toLowerCase());
      console.log('this is searching');
      console.log(based);
      return based;
    });
  }
}
