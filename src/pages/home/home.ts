import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  t: String = "ahaha";
  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {

  }

  login() {
    this.t = "hbvvdjk";
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
