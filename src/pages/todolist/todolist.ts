import { Utils } from './../../utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Todolist } from '../../model/Todolist';
import { LocalUser } from '../../model/LocalUser';
import * as firebase from 'firebase/app';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the TodolistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todolist',
  templateUrl: 'todolist.html',
})
export class TodolistPage {

  currentUser: LocalUser;
  currentKey: string;

  utils: Utils = new Utils();

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
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
    })    
  }

  ionViewDidLoad() {
    
  }

  addTodolist() {
    let prompt = this.alertCtrl.create({
      title: 'Ajouter une todolist',
      message: "Entrez un titre pour votre todolist",
      inputs: [
        {
          name: 'Titre',
          placeholder: 'Titre'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: _ => {}
        },
        {
          text: 'Confirmer',
          handler: data => {
            if (data.Titre == '') {
              this.alertCtrl.create({
                title: 'Erreur lors de la création de la todolist',
                message: 'Le nom de la todolist ne peut pas être vide',
                buttons: [{text: 'OK'}]
              }).present()
            } else {
              this.utils.addTodolist(this.currentUser, data.Titre)
              this.db.object('/Users/' + this.currentKey).set(this.currentUser);
            }
          }
        }
      ]
    });
    prompt.present();
  }



}
