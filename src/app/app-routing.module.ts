import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('./screens/home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'dice-details',
    loadChildren: () => import('./screens/dice-details/dice-details.module').then( m => m.DiceDetailsPageModule)
  },
  {
    path: 'character-details',
    loadChildren: () => import('./screens/character-details/character-details.module').then( m => m.CharacterDetailsPageModule)
  },
  {
    path: 'character-home',
    loadChildren: () => import('./screens/character-home/character-home.module').then( m => m.CharacterHomePageModule)
  },
  {
    path: 'dice-home',
    loadChildren: () => import('./screens/dice-home/dice-home.module').then( m => m.DiceHomePageModule)
  },
  {
    path: 'modalpopup',
    loadChildren: () => import('./modalpopup/modalpopup.module').then( m => m.ModalpopupPageModule)
  },
  {
    path: 'modaldicepopup',
    loadChildren: () => import('./modaldicepopup/modaldicepopup.module').then( m => m.ModaldicepopupPageModule)
  },
  {
    path: 'characteranimation',
    loadChildren: () => import('./screens/characteranimation/characteranimation.module').then( m => m.CharacteranimationPageModule)
  },
  {
    path: 'diceanimation',
    loadChildren: () => import('./screens/diceanimation/diceanimation.module').then( m => m.DiceanimationPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}