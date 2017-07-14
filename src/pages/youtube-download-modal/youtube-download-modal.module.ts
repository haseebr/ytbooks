import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YoutubeDownloadModal } from './youtube-download-modal';

@NgModule({
  declarations: [
    YoutubeDownloadModal,
  ],
  imports: [
    IonicPageModule.forChild(YoutubeDownloadModal),
  ],
  exports: [
    YoutubeDownloadModal
  ]
})
export class YoutubeDownloadModalModule {}
