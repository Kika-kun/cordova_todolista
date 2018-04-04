import { Utils } from './../../utils/utils';
import { Todolist } from './../../model/Todolist';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Todo } from '../../model/Todo';
import * as firebase from 'firebase/app';
import { LocalUser } from '../../model/LocalUser';


/**
 * Generated class for the TodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo',
  templateUrl: 'todo.html',
})
export class TodoPage {

  title="Gestion des todos"


  todolistId: number;
  todolistDisplayId: number;
  currentKey: string;
  currentUser: LocalUser = new LocalUser('','', []);

  utils: Utils = new Utils();

  
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {

    // Get the current user uid
    let currentUserId: string = firebase.auth().currentUser.uid;
    console.log(currentUserId);
    
    db.list('/Users').snapshotChanges().subscribe(snapshots=>{
      snapshots.forEach(snapshot => {
        if (snapshot.payload.val().id == currentUserId) {
          this.currentKey = snapshot.key;
          this.currentUser = snapshot.payload.val();
          for (let t of this.currentUser.todolists) {
            if (t.id == this.todolistId) {
              console.log("10")
              this.todolistDisplayId = this.currentUser.todolists.indexOf(t);
            }
          }
        }
      });
    },
    _ => {})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoPage');
    this.todolistId = this.navParams.get('todolistId')
    
  }

  addTodo() {
    let prompt = this.alertCtrl.create({
      title: 'Ajouter un todo',
      message: "Entrez le contenu de votre todo",
      inputs: [
        {
          name: 'Contenu',
          placeholder: 'Contenu'
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
            if (data.Contenu == '') {
              this.alertCtrl.create({
                title: 'Erreur lors de la création du todo',
                message: 'Le contenu du todo ne peut pas être vide',
                buttons: [{text: 'OK'}]
              }).present()
            } else {
              console.log(this.currentUser)
              this.utils.addTodoFromUser(this.currentUser, this.todolistId, data.Contenu)
              console.log(this.currentUser)
              this.db.object('/Users/'+this.currentKey).set(this.currentUser);
            }
          }
        }
      ]
    });
    prompt.present();
  }
}
