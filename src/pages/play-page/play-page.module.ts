import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayPage } from './play-page';

@NgModule({
  declarations: [
    PlayPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayPage),
  ],
  exports: [
    PlayPage
  ]
})
export class PlayPageModule {}
