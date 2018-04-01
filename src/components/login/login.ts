import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui'


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

  @Input()
  navCtrl: NavController;

  constructor(public afAuth: AngularFireAuth, private alertCtrl: AlertController) {
    console.log('Hello LoginComponent Component');
    this.text = 'Hello World';
  }

  private email: string = "";
  private pass: string = "";
  private firstTime: boolean;


  login() {
    if (this.firstTime) {
      this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.pass).catch( err => {

        this.alertCtrl.create({
          title: 'Erreur lors de la création du compte',
          subTitle: this.getErrorText(err),
          buttons: ['OK']
        }).present()
      }).then(_ => {
        this.alertCtrl.create({
          title: "Création du compte réussie !",
          buttons: [{
            text: "OK",
            handler: _ => {
              //this.navCtrl.setRoot()
            }
          }]
        })
      })
    } else {
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pass).catch( err => {
        this.alertCtrl.create({
          title: 'Erreur lors de la connexion à votre compte',
          subTitle: this.getErrorText(err),
          buttons: ['OK']
        }).present()
      }).then(_ => {
        this.alertCtrl.create({
          title: "Connexion au compte réussie !",
          buttons: [{
            text: "OK",
            handler: _ => {
              //this.navCtrl.setRoot()
            }
          }]
        })
      })
    }

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

  logout() {
    this.afAuth.auth.signOut()
  }
}
