import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  album: any;

  constructor(public navCtrl: NavController, public dataService: DataProvider, public alertCtrl: AlertController, public navParams: NavParams ) {
    this.album = this.navParams.data;
  }

  //THIS IS A FAILED ATTEMPT AT GIVING THE USER A PROMPT BEFORE DELETING THE ALBUM

  // confirmDelete():void {
  //   let confirm = this.alertCtrl.create({
  //     title: 'Delete',
  //     message: 'Are you sure you want to delete this album?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Delete',
  //         handler: (id) => {
  //           console.log('Delete clicked');
  //           this.dataService.deleteAlbum(id);
  //         }
  //       },
  //     ]
  //   });
  //   confirm.present();
  // }

  updateAlbum(album):void {
    let prompt = this.alertCtrl.create({
      title: 'Edit Album',
      message: "Change the name, artist, and description of the album.",
      inputs: [
        {
          name: 'albumName',
          placeholder: "Name: " + album.albumName
        },
        {
          name: 'albumArtist',
          placeholder: "Artist: " + album.albumArtist
        },
        {
          name: 'albumDesc',
          placeholder: "Description: " + album.albumDesc
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.dataService.updateAlbum(album.id, data.albumName, data.albumArtist, data.albumDesc);
          }
        }
      ]
    });
    prompt.present();
  }

  delete(id):void {
    this.dataService.deleteAlbum(id);
    this.GoToHomePage()
  }

  GoToHomePage() {
    this.navCtrl.push('HomePage');
  }

}
