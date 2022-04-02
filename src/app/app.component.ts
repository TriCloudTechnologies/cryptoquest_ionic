import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Lorem Ipsum', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Lorem Ipsum', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Lorem Ipsum', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Settings', url: '/folder/Archived', icon: 'settings' },
    { title: 'Help', url: '/folder/Trash', icon: 'help' },
  ];
  static screenwidth: any;
  static screenheight: any;
  constructor(public platform: Platform) {
    platform.ready().then(() => {
      console.log('Device ready..............');
      AppComponent.screenwidth = platform.width();
      AppComponent.screenheight = platform.height();
    });
  }
}
