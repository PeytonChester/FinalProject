import {Injectable} from '@angular/core';
import {AngularFirestoreCollection, AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs";

//---------------------------------------------------------------------------------------

export interface Album {
  id?: string;
  albumArtist: string;
  albumDesc: string;
  albumName: string;
  cover: string;
  reverse: string;
}

@Injectable()
export class DataProvider {

  albumsListRef: AngularFirestoreCollection<Album>;
  albumList: Observable<Album[]>;

  constructor(private afs: AngularFirestore) {
    this.albumsListRef = this.afs.collection<Album>('VinylWeb');
    this.albumList = this.albumsListRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Album;
        const id = action.payload.doc.id;
        return {id, ...data};
      });
    });

  }

  updateAlbum(albumID, newName, newArtist, newDesc): void {
    this.albumsListRef.doc(albumID).update({"albumName": newName});
    this.albumsListRef.doc(albumID).update({"albumArtist": newArtist});
    this.albumsListRef.doc(albumID).update({"albumDesc": newDesc});
  }

  deleteAlbum(albumID): void {
    this.albumsListRef.doc(albumID).delete();
  }

  addNewAlbum(albumInfo):void {
    if (albumInfo) {
      this.albumsListRef.add(albumInfo);
    }
  }

}