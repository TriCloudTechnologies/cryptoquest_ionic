import { Component, OnInit } from '@angular/core';
import { DiceHomePage } from '../screens/dice-home/dice-home.page';
import { HostListener, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modaldicepopup',
  templateUrl: './modaldicepopup.page.html',
  styleUrls: ['./modaldicepopup.page.scss'],
})
export class ModaldicepopupPage implements OnInit, OnDestroy {
  loading: boolean = false;
  dicepopupdata: any = [];
  searchArray: any = [];
  searchName: any;
  constructor(private modalController: ModalController) {}

  ionViewWillEnter() {
    this.loading = false;
  }
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

  ionViewDidEnter() {
    this.dicepopupdata = DiceHomePage.popuparray;
    console.log(this.dicepopupdata);
    this.searchArray = this.dicepopupdata;
    console.log('This is searching data');

    this.loading = true;
  }

  getItems(event: { target: { value: any } }) {
    this.searchName = event.target.value;
    this.searchArray = this.dicepopupdata.filter((result: any) => {
      var based = result.name
        .toLowerCase()
        .includes(this.searchName.toLowerCase());
      console.log('this is searching');
      console.log(based);
      return based;
    });
  }
}
