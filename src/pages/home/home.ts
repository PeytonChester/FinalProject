import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, ToastController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  albums: any;

  constructor(public navCtrl: NavController, public dataService: DataProvider, public alertCtrl: AlertController, public toastCtrl: ToastController ) {
    this.albums = this.dataService.albumList;
  }

  GoToInfoPage(album) {
    this.navCtrl.push('InfoPage', album);
  }

  // deleteAlbum(id):void {
  //   this.dataService.deleteAlbum(id);
  // }

  // updateAlbumDesc(card):void {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Edit Album Desc',
  //     message: "Change the message of the card.",
  //     inputs: [
  //       {
  //         name: 'albumDesc',
  //         placeholder: album.albumDesc
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           this.dataService.updateAlbumDescription(album.id, data.albumDesc)
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }


  addAlbum():void {
    let prompt = this.alertCtrl.create({
      title: 'Add Album',
      message: "Add the following information to add an album.",
      inputs: [
        {
          name: 'albumName',
          placeholder: 'Put the name of the Album.'
        },
        {
          name: 'albumArtist',
          placeholder: 'Put the name of the Artist.'
        },
        {
          name: 'albumDesc',
          placeholder: 'Write the description for the album.'
        },
        {
          name: 'cover',
          placeholder: 'Post an Image URL of the front cover.'
        },
        {
          name: 'reverse',
          placeholder: 'Post an Image URL of the back cover.'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancelled');
          }
        },
        {
          text: 'Add Album',
          handler: data => {
            this.dataService.addNewAlbum(data);
            this.presentToast();
          }
        }
      ]
    });
    prompt.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Album was added successfully',
      duration: 3000
    });
    toast.present();
  }

}
