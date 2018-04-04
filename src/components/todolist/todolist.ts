import { Utils } from './../../utils/utils';
import { Component, Input } from '@angular/core';
import { Todolist } from '../../model/Todolist';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TodoPage } from '../../pages/todo/todo';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalUser } from '../../model/LocalUser';
import { Subscription } from 'rxjs/Subscription';


/**
 * Generated class for the TodolistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'todolist',
  templateUrl: 'todolist.html'
})
export class TodolistComponent {

  @Input()
  todolist: Todolist;

  currentUser: LocalUser;
  currentKey: string;

  utils: Utils = new Utils()

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {

    // Get the current user uid
    let currentUserId: string = firebase.auth().currentUser.uid;
    console.log(currentUserId);
    
    db.list('/Users').snapshotChanges().subscribe(
      snapshots=>{
        snapshots.forEach(snapshot => {
          if (snapshot.payload.val().id == currentUserId) {
            this.currentUser = snapshot.payload.val();
            this.currentKey = snapshot.key;
          }
        });
      }, 
      _ => {}
    )
  }

  showTodos() {
    this.navCtrl.push(TodoPage, {'todolistId': this.todolist.id});
  }

  removeTodolist() {
    this.alertCtrl.create({
      title: 'Confirmer la suppression',
      buttons: [
        {text: 'Annuler'}, 
        {
          text: 'Confirmer', 
          handler: _ => {
            this.utils.removeTodolist(this.currentUser, this.todolist.id);
            this.db.object('/Users/'+this.currentKey).set(this.currentUser)
          }
        }
      ]
    }).present()
  }

  editTitle() {
    let prompt = this.alertCtrl.create({
      title: 'Modifier une todolist',
      message: "Entrez le nouveau titre de votre todolist",
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
                title: 'Erreur lors de la modification de la todolist',
                message: 'Le nom de la todolist ne peut pas être vide',
                buttons: [{text: 'OK'}]
              }).present()
            } else {
              this.utils.editTodolistTitle(this.currentUser, this.todolist.id, data.Titre)
              this.db.object('/Users/' + this.currentKey).set(this.currentUser);
            }
          }
        }
      ]
    });
    prompt.present();
  }

}
