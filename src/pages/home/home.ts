import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { async } from '@firebase/util';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title="Connexion à todolist"
  t: String = "ahaha";
  constructor(public navCtrl: NavController) {
   
  }

}
