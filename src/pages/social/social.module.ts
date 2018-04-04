import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialPage } from './social';
import { NavbarModule } from '../../components/navbar/navbar.module';

@NgModule({
  declarations: [
    SocialPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialPage),
    NavbarModule
  ],
})
export class SocialPageModule {}
