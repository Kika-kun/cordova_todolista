import { Utils } from './../../utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalUser } from '../../model/LocalUser';
import { SocialTodoPage } from '../social-todo/social-todo';


/**
 * Generated class for the SocialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})
export class SocialPage {

  currentUser: LocalUser;
  currentKey: string;

  authorizedOn: string[];

  utils: Utils = new Utils()


  constructor(public navCtrl: NavController, public navParams: NavParams,  private db: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
        // Get the current user uid
        let currentUserId: string = firebase.auth().currentUser.uid;
        let currentUserMail: string = firebase.auth().currentUser.email;
        
        db.list('/Users').snapshotChanges().subscribe(snapshots=>{
          this.authorizedOn = null;

          snapshots.forEach(snapshot => {
            if (snapshot.payload.val().authorized && snapshot.payload.val().authorized.indexOf(currentUserMail) > -1) {
              if (!this.authorizedOn) {
                this.authorizedOn = new Array<string>()
              }
              this.authorizedOn.push(snapshot.payload.val().email);
              console.log(this.authorizedOn)
            }
            if (snapshot.payload.val().id == currentUserId) {
              this.currentUser = snapshot.payload.val();
              this.currentKey = snapshot.key;
            }
          });
        })    
  }

  ionViewDidLoad() {
  }

  authorizeSomeone() {
    let prompt = this.alertCtrl.create({
      title: 'Ajouter une autorisation',
      message: "Entrez l'adresse e-mail autorisée",
      inputs: [
        {
          name: 'Adresse',
          placeholder: 'Adresse e-mail'
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
            if (data.Adresse == '') {
              this.alertCtrl.create({
                title: 'Erreur lors de l\'ajout de l\'autorisation',
                message: 'L\'adresse e-mail ne peut pas être vide',
                buttons: [{text: 'OK'}]
              }).present()
            } else {
              this.utils.addAuthorize(this.currentUser, data.Adresse)
              this.db.object('/Users/' + this.currentKey).set(this.currentUser);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  showSocialTodo(email_clicked: string) {
    this.navCtrl.push(SocialTodoPage, {'email': email_clicked});
  }
}
