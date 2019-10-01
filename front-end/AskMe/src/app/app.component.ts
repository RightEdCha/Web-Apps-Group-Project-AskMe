import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage'
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  appMenu = [];
  authenticated = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar, 
    private storage:Storage,
    private authService:AuthService,
    public route: ActivatedRoute,
    public router: Router,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
    this.changeMenu();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.authService.getUserSubject().subscribe(authState=> {
    this.authenticated = authState ? true : false;
    this.changeMenu();
    });
  }
   changeMenu(){
      if(this.authenticated === false) {
        this.appMenu =[
          {title: 'Home', url: '/home', icon: 'home'},
          {title: 'Login/Register', url: '/login-in', icon: 'log-in'} ]
      }
      else {
        this.appMenu = [
          {title: 'Home', url: '/home', icon: 'home'},
          {title: 'Account', url: '/account', icon: 'person'},
          {title: 'Create Question', url: '/question-submit', icon: 'create'} ]
      }
    }
    logOut(){
      this.authService.killSession();
      this.menuCtrl.close();
    }
  }

