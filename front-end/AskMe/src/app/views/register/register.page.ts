import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from '../../services/message-service.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

username:string = '';
password:string = '';
firstName:string = '';
lastName:string = '';
email:string = '';

userData: any;

  constructor(private messageService: MessageServiceService, private alertController: AlertController, public route: ActivatedRoute,
    public router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  
  
  register(){
    if(this.username.length==0 || this.password.length==0 || this.email.length == 0 || this.firstName.length == 0 || this.lastName.length == 0)
    {
     this.emptyFields();
   }
   else
   {
    this.messageService.registerUser(this.firstName, this.lastName, this.email, this.username, this.password)
     .subscribe(res=> {
       this.userData = res;
       this.messageService.getLogIn(this.username, this.password).subscribe(res=> {
         this.authService.saveSession(res);
         console.log(res);
       });
       console.log(res);
       this.success();
       this.router.navigateByUrl('/home')
     }, err=> {
       this.restError();
     });
    }
 }
 
 async emptyFields(){
  const alert = await this.alertController.create({
    header: 'Registration Error',
    message: 'One or more fields are incomplete',
    buttons: ['OK']
  });

  await alert.present();
 }

 async restError() {
   const alert = await this.alertController.create({
     header: 'Resitration Error',
     message: 'One or more fields are invalid',
     buttons: ['OK']
   });

   await alert.present();
 }

 async success() {
   const alert = await this.alertController.create({
     header: 'Welcome!',
     message: 'You are registered with AskMe',
     buttons: ['OK']
   });

   await alert.present();
 }

}

