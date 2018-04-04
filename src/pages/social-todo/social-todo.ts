import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Todolist } from '../../model/Todolist';
import * as firebase from 'firebase/app';
import { LocalUser } from '../../model/LocalUser';
import { Utils } from '../../utils/utils';


/**
 * Generated class for the SocialTodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social-todo',
  templateUrl: 'social-todo.html',
})
export class SocialTodoPage {

  title="Todoliste de "


  currentUser: LocalUser;
  currentKey: string;

  utils: Utils = new Utils();

  email: string = '';
  tl: Todolist[];

  constructor(public navCtrl: NavController, public navParams: NavParams,  private db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
  // Get the current user uid
  let currentUserId: string = firebase.auth().currentUser.uid;
  console.log(currentUserId);
  
  db.list('/Users').snapshotChanges().subscribe(snapshots=>{
    snapshots.forEach(snapshot => {
      if (snapshot.payload.val().id == currentUserId) {
        this.currentUser = snapshot.payload.val();
        this.currentKey = snapshot.key;
      }
    });
  }, 
  _ => {})
  }

  ionViewDidLoad() {
    this.email = this.navParams.get('email')
    this.title += this.email
    

    this.db.list('/Users').snapshotChanges().subscribe(snapshots=>{
      snapshots.forEach(snapshot => {

        if (snapshot.payload.val().email == this.email) {
          this.tl = snapshot.payload.val().todolists;
        }
      });
    },
    _ => {})
  }

  copyTodo(t: Todolist) {
    this.utils.addTodolistComplete(this.currentUser, t);
    this.db.object('/Users/' + this.currentKey).set(this.currentUser);
  }

}
