import { HomePage } from './../../pages/home/home';
import { Component, Input} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the NavbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {

  @Input()
  title: string;

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController) {
  }
  logOut(){
    this.navCtrl.setRoot(HomePage)
    this.afAuth.auth.signOut()
  }


}
