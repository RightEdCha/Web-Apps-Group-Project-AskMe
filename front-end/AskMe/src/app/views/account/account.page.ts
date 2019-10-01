import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';
import { ViewChild } from '@angular/core'
import { MessageServiceService } from '../../services/message-service.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  username: string = '';
  password: string = '';

  userData: any;
  userDataForQuestions: any;
  userCloseQuestion: any;
  authenticated = false;

  constructor(private messageService: MessageServiceService, private alertController: AlertController, public route: ActivatedRoute,
    public router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserSubject().subscribe(authState=> {
      this.authenticated = authState ? true : false;
      this.username = this.authService.getUsername();
      this.password = this.authService.getPassword();
      this.showAccountInfo();
      this.getQuestionsByUsername();
    });
  }


  showAccountInfo(){

    // this.firstName, this.lastName, this.email,
      this.messageService.getLogIn(this.username, this.password)
      .subscribe(res=> {
        this.userData = res;
        console.log(this.userData);
        // this.router.navigateByUrl('/home')
      }, err=> {
        console.log("Error");
      });
   }

   getQuestionsByUsername(){
    this.messageService.getQuestionsByUsername(this.username)
    .subscribe(res=> {
      this.userDataForQuestions = res;
      console.log(this.userDataForQuestions);
      // this.router.navigateByUrl('/home')
    }, err=> {
      console.log("Error");
    });
   }

   closeQuestion(questionId: string){
     console.log(questionId)
    this.messageService.closeQuestion(questionId)
    .subscribe(res=> {
      this.userCloseQuestion = res;
      this.router.navigateByUrl('/questionView/' + questionId)
      console.log(this.userCloseQuestion);
      this.presentAlert();
    }, err=> {
      console.log("Error");
    });
   }

   async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Your question have been closed',
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

}

