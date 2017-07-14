import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { DownloadsPage } from '../pages/downloads-page/downloads-page';
import { PlayPage } from '../pages/play-page/play-page'

import { KeysPipe } from '../pipe';

import { YoutubeDownloadModal } from '../pages/youtube-download-modal/youtube-download-modal'

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        KeysPipe,
        YoutubeDownloadModal,
        TabsPage,
        DownloadsPage,
        PlayPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        JsonpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        YoutubeDownloadModal,
        TabsPage,
        DownloadsPage,
        PlayPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
