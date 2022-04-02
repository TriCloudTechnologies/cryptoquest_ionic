import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HostListener, OnDestroy } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-characteranimation',
  templateUrl: './characteranimation.page.html',
  styleUrls: ['./characteranimation.page.scss'],
})
export class CharacteranimationPage implements OnInit,OnDestroy {
  detailsdata: any;

  constructor(
    private animationCtrl: AnimationController,
    private storage: Storage,
    private modalController:ModalController
  ) {}

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
  
  @ViewChild('loadingIcon', { read: ElementRef }) loadingIcon: ElementRef;
  startLoad() {
    const loadingAnimation = this.animationCtrl
      .create('loading-animation')
      .addElement(this.loadingIcon.nativeElement)
      .duration(10000)
      .iterations(Infinity)
      .fromTo('transform', 'rotateY(0deg)', 'rotateY(360deg)');
    loadingAnimation.play();
  }
  ionViewDidEnter() {
    this.startLoad();
  }
  ionViewWillEnter() {
    this.storage.get('detailsarray').then(
      (data) => {
        this.detailsdata = data;
        console.log('this is shiraz data');
        console.log(this.detailsdata);
      },
      (error) => console.error(error)
    );
  }
}
