import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AnimationController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CharacteranimationPage } from '../characteranimation/characteranimation.page';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.page.html',
  styleUrls: ['./character-details.page.scss'],
})
export class CharacterDetailsPage implements OnInit {
  loading: boolean = false;
  iteration: any = [];
  finaliteration: any = [];
  public arr: any = {};
  public image: any;
  public displayimage: any;
  public text: any;
  public displayname: any;
  detailsdata: any;
  p: any;
  sub: any;

  constructor(
  
    private navCtrl: NavController,
    private httpclient: HttpClient,
    private route: ActivatedRoute,
    private animationCtrl: AnimationController,
    private modalController: ModalController,
    private storage: Storage,
  ) {}

  ngOnInit() {}

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
  goBack() {
    this.navCtrl.pop();
  }

  async presentModal() {
    const enterAnimation = (baseEl: any) => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(root.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.1', '0.85');

      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(root.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '1', transform: 'scale(1)' },
        ]);

      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(700)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl: any) => {
      return enterAnimation(baseEl).direction('reverse');
    };

    const modal = await this.modalController.create({
      component: CharacteranimationPage,
      enterAnimation,
      leaveAnimation,
      cssClass: 'animation-modal-for-character',
    });
    return await modal.present();
  }
}
