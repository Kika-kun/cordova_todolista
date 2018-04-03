import { NavController, Alert } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { TodolistPage } from '../../pages/todolist/todolist';
import { AngularFireDatabase } from 'angularfire2/database';
import { LocalUser } from '../../model/LocalUser';


/**
 * Generated class for the LoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {

  text: string;

  constructor(public afAuth: AngularFireAuth, private alertCtrl: AlertController, private db: AngularFireDatabase, public navCtrl: NavController) {
  }

  private email: string = "";
  private pass: string = "";
  private firstTime: boolean;


  goToMenu = (_ => {
    this.navCtrl.setRoot(TodolistPage);
  })


  async login() {
    this.afAuth.auth.signOut().catch(err => {});

    let alertToShow: Alert;
    let error: string = '';
    let u: firebase.User;

    if (this.firstTime) {
      u = await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.pass).catch(err => error = err)

      if (error != '') {
        alertToShow = this.alertCtrl.create({
          title: 'Erreur lors de la création du compte',
          subTitle: this.getErrorText(error),
          buttons: ['OK']
        })
      } else {
        alertToShow = this.alertCtrl.create({
          title: "Création du compte réussie !",
          buttons: [{
            text: "OK",
            handler: this.goToMenu
          }]
        })

        // Ajoute le user dans notre base
        let newUser = new LocalUser(u.uid, this.email, null);
        console.log(newUser);
        this.db.list('/Users').push(newUser);
      }
    } else {
      u = await this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pass).catch(err => error = err);
      if (error != '') {
        alertToShow = this.alertCtrl.create({
          title: 'Erreur lors de la connexion à votre compte',
          subTitle: this.getErrorText(error),
          buttons: ['OK']
        })
      } else {
        alertToShow = this.alertCtrl.create({
          title: "Connexion au compte réussie !",
          buttons: [{
            text: "OK",
            handler: this.goToMenu
          }]
        })
      }
      
    }

    alertToShow.present();

    console.log(this.navCtrl);
  }

  getErrorText(err): string {
    let errorText: string;
    switch(err.code) {
      // Erreurs creation compte
      case "auth/email-already-in-use":
        errorText = "Adresse e-mail déjà utilisée";
        break;
      case "auth/operation-not-allowed":
        errorText = "Ne devrait jamais arriver (problème conf firebase)";
        break;
      case "auth/weak-password":
        errorText = "Le mot de passe est trop faible";
        break;

      // Erreur log in
      case "auth/user-disabled":
        errorText = "Votre compte a été bloqué";
        break;
      case "auth/user-not-found":
        errorText = "Aucun compte n'est associé à cette adresse e-mail";
        break;
      case "auth/wrong-password":
        errorText = "Le mot de passe est incorrect";
        break;

      // Erreur log in et/ou creation
      case "auth/invalid-email":
        errorText = "Adresse e-mail invalide";
        break;

      default: 
        errorText = "On m'aurait menti ?";
    }
    return errorText
  }

  createOurUser(user: firebase.User) {
    let u: LocalUser;
    u.email = user.email;
    u.id = user.uid;
    u.todolists = null;


  }

  logout() {
    this.afAuth.auth.signOut()
  }
}
