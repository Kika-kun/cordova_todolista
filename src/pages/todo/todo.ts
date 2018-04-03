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

  todolist: Todolist;
  currentKey: string;
  currentUser: LocalUser;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {

    // Get the current user uid
    let currentUserId: string = firebase.auth().currentUser.uid;
    console.log(currentUserId);
    
    db.list('/Users').snapshotChanges().subscribe(snapshots=>{
      snapshots.forEach(snapshot => {
        if (snapshot.payload.val().id == currentUserId) {
          this.currentKey = snapshot.key;
          this.currentUser = snapshot.payload.val();
        }
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoPage');
    this.todolist = this.navParams.get('todolist')
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
              if (this.todolist.todos == null) {
                this.todolist.todos = new Array<Todo>();
              }
              this.todolist.todos.push(this.createTodo(data.Contenu))

              // Dans le currentUser, je vais editer la todolist qui represente cette todolist
              const todolistId = this.todolist.id;
              let userTlId = -1;
              for (let i=0; i<this.currentUser.todolists.length; i++) {
                if (this.currentUser.todolists[i].id == todolistId) {
                  userTlId = i;
                  break;
                }
              } 
              if (userTlId == -1) {
                console.log("Erreur : Ajout d'un todo dans une todolist qui n'existe pas")
              } else {
                this.currentUser.todolists[userTlId] = this.todolist;
                console.log(this.currentUser)
                this.db.object('/Users/'+this.currentKey).set(this.currentUser);
              }
            }
          }
        }
      ]
    });
    prompt.present();
  }



 

  createTodo(content: string) {
    // Get the id for the new todolist
    let i = 0
    for (const t of this.todolist.todos) {
      i = Math.max(t.id, i);
    }

    return new Todo(content, i+1);
  }

}
