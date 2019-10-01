import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from '../../services/message-service.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login-in',
  templateUrl: './login-in.page.html',
  styleUrls: ['./login-in.page.scss'],
})
export class LoginInPage implements OnInit {

  username: string;
  password: string;

  userData: any;

  constructor(private messageService: MessageServiceService, private alertController: AlertController, public route: ActivatedRoute,
    public router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

   logIn(){
		 this.messageService.getLogIn(this.username, this.password)
			.subscribe(res=> {
        this.userData = res;
        this.authService.saveSession(res);
        console.log(res);
        this.router.navigateByUrl('/home')
			}, err=> {
        this.error();
			});
  }
  
  async error() {
    const alert = await this.alertController.create({
      header: 'Log In',
      subHeader: 'Wrong username or password combination',
      message: 'Please enter valid username or password. If not registered, please register.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Logged In',
      buttons: ['OK']
    });

    await alert.present();
  }
}