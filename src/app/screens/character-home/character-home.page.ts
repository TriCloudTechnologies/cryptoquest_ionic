import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Connection } from '@metaplex/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata/dist/src/accounts/Metadata';
import { LoginPage } from 'src/app/login/login.page';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-character-home',
  templateUrl: './character-home.page.html',
  styleUrls: ['./character-home.page.scss'],
})
export class CharacterHomePage implements OnInit {
  public loading: boolean;
  iteration: any = [];
  public arr: any = {};
  public image: any;
  public displayimage: any;
  public text: any;
  public displayname: any;
  static URIdata: any;
  xyz: any = [];
  static finalvar: any = {};
  static phantomassets: any = [];
  PhantomNFT: any = [];
  phantomAddress = '';
  searchArray: any = [];
  searchName: any;
  searchTerm: String;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private httpclient: HttpClient,
    private storage: Storage
  ) {}

  ionViewWillEnter() {
    this.loading = false;
    this.storage.get('wallets').then(
      (data) => {
        if (data.phantomAddress != '') {
          this.phantomAddress = data.phantomAddress;
          this.solanadisplay();
        }
      },
      (error) => console.error(error)
    );

    console.log('phantom wallet address is: ' + this.phantomAddress);
  }

  ionViewDidEnter() {}
  ngOnInit() {}

  goToCharacterDetails(p: any) {
    this.storage.set('detailsarray', p).then(
      (data) => {
        console.log('Stored first item!', data);
        this.PhantomNFT = [];
        this.router.navigateByUrl('character-details');
      },
      (error) => console.error('Error storing item', error)
    );
  }
  goBack() {
    this.navCtrl.pop();
  }

  async solanadisplay() {
    const connection = new Connection('mainnet-beta');
    const ownerPublickey = this.phantomAddress;
    const nftsmetadata = await Metadata.findDataByOwner(
      connection,
      ownerPublickey
    );
    for (let i = 0; i < nftsmetadata.length; i++) {
      this.xyz[i] = nftsmetadata[i]['mint'];
    }
    LoginPage.finalvar = this.xyz;
    this.getmetadata();
  }

  async getmetadata() {
    const connection = new Connection('mainnet-beta');
    for (let x = 0; x < LoginPage.finalvar.length; x++) {
      const metadataPDA = await Metadata.getPDA(LoginPage.finalvar[x]);
      const tokenMetadata = await Metadata.load(connection, metadataPDA);
      LoginPage.URIdata = tokenMetadata.data['data']['uri'];
      this.httpclient.get(LoginPage.URIdata).subscribe((res) => {
        console.log('this is the uri key' + x);
        LoginPage.phantomassets[x] = res;
        this.loading = true;
        console.log(LoginPage.phantomassets);
      });
    }
    this.PhantomNFT = LoginPage.phantomassets;
    console.log('Being used for the local display');
    console.log(this.PhantomNFT);
    this.searchArray = this.PhantomNFT;
    console.log('used for search');
    console.log(this.searchArray);
  }

  getItems(event: { target: { value: any } }) {
    this.searchName = event.target.value;

    this.searchArray = this.PhantomNFT.filter((result: any) => {
      var based = result.collection.name
        .toLowerCase()
        .includes(this.searchName.toLowerCase());
      console.log('this is searching');
      console.log(based);
      return based;
    });
  }
}
