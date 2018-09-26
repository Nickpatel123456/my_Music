import {Component} from '@angular/core';
import {ActionSheetController, LoadingController, NavController} from 'ionic-angular';
import {MusicsProvider} from "../../providers/musics/musics";
import {SocialSharing} from "@ionic-native/social-sharing";
import {MusicPlayerPage} from "../music-player/music-player";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allMusic = [];

  constructor(public navCtrl: NavController,
              private socialSharing: SocialSharing,
              private musicProvider: MusicsProvider,
              public loadingController: LoadingController,
              public actionSheetController: ActionSheetController) {
  }

  ionViewDidLoad() {
    let allMusicLoadingController = this.loadingController.create({
      content: 'Getting Your Songs from server'
    });
    allMusicLoadingController.present();
    this.musicProvider.getMusic()
      .subscribe((musicList) => {
        this.allMusic = musicList;
        allMusicLoadingController.dismiss();
      });
  }

  shareSong(music) {
    let sharesongActionSheet = this.actionSheetController.create({
      title: 'Share Song',
      buttons: [
        {
          text: 'facebook',
          icon: 'logo-facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url)
          }
        },
        {
          text: 'Twitter',
          icon: 'logo-twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url)
          }
        },
        {
          text: 'Share',
          icon: 'share',
          handler: () => {
            this.socialSharing.share(music.name, '', music.image, music.music_url)
          }
        },
        {
          text: 'Cancel',
          role: 'destructive'
        }
      ]
    });

    sharesongActionSheet.present();
  }

  goToMusic(music) {
    this.navCtrl.push(MusicPlayerPage, {
      music: music
    });
  }
}
