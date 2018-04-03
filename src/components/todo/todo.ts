import { Component, Input } from '@angular/core';
import { Todo } from '../../model/Todo';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { LocalUser } from '../../model/LocalUser';
import { Utils } from '../../utils/utils';
import * as firebase from 'firebase/app';


/**
 * Generated class for the TodoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'todo',
  templateUrl: 'todo.html'
})
export class TodoComponent {


  @Input()
  todo: Todo;

  @Input()
  todolistId: number;

  currentUser: LocalUser;
  currentKey: string;
  currentTodolistId: number;

  utils: Utils = new Utils()

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
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

}
