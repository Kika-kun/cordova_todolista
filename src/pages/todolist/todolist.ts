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

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    

    console.log("On va taper dans la DB");

    // Get the current user uid
    let currentUserId: string = firebase.auth().currentUser.uid;
    console.log(currentUserId);
    
    db.list('/Users').snapshotChanges().subscribe(snapshots=>{
      snapshots.forEach(snapshot => {
        if (snapshot.payload.val().id == currentUserId) {
          this.currentUser = snapshot.payload.val();
        }
      });
    })

    console.log(this.currentUser);
    
  }

  ionViewDidLoad() {
    
  }

  AddTodolist() {
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
              if (this.currentUser.todolists == null) {
                this.currentUser.todolists = new Array<Todolist>();
              }
              this.currentUser.todolists.push(this.createTodolist(data.Titre))
            }
          }
        }
      ]
    });
    prompt.present();
  }

  createTodolist(title: string): Todolist {
    // Get the id for the new todolist
    let i = 0
    for (const t of this.currentUser.todolists) {
      i = Math.max(t.id, i);
    }

    return new Todolist(title, i+1);
  }

}
