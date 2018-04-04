import { SocialTodoPageModule } from './../pages/social-todo/social-todo.module';
import { SocialPageModule } from './../pages/social/social.module';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginComponent } from '../components/login/login';

import { TodolistPageModule } from './../pages/todolist/todolist.module';
import { TodolistPage } from './../pages/todolist/todolist';

import { TodoPage } from '../pages/todo/todo';
import { TodoPageModule } from '../pages/todo/todo.module';

 
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabaseProvider } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SocialPage } from '../pages/social/social';
import { SocialTodoPage } from '../pages/social-todo/social-todo';


 
 
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAkJS-OR0RG1Osb5p8xrkdCAlYlcSCInpA",
  authDomain: "todolist-af8e0.firebaseapp.com",
  databaseURL: "https://todolist-af8e0.firebaseio.com",
  projectId: "todolist-af8e0",
  storageBucket: "todolist-af8e0.appspot.com",
  messagingSenderId: "392620180704"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    LoginComponent, 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    TodolistPageModule,
    TodoPageModule, 
    SocialPageModule, 
    SocialTodoPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    TodolistPage, 
    TodoPage,
    SocialPage, 
    SocialTodoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
  ]
})
export class AppModule {}
