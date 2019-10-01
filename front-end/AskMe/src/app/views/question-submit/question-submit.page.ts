import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from '../../services/message-service.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-question-submit',
  templateUrl: './question-submit.page.html',
  styleUrls: ['./question-submit.page.scss'],
})
export class QuestionSubmitPage implements OnInit {
  numberAnswers: string = '';
  answer1: string = '';
  answer2: string = '';
  answer3: string = '';
  answer4: string = '';
  category: string = '';
  questionSubmit: string = '';
  username: string = '';

  authenticated = false;

  constructor(private messageService: MessageServiceService, public loadingController: LoadingController, public route: ActivatedRoute,
    public router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserSubject().subscribe(authState=> {
      this.authenticated = authState ? true : false;
    });
    this.checkAuth();
  }
  checkAuth(){
    if(this.authenticated === false){
      this.router.navigateByUrl('/home');
      //TODO: insert alert here
    }
    else {
      this.username = this.authService.getUsername();
    }
  }
  createQuestion(){
    this.messageService.createQuestion(this.username, this.category, this.questionSubmit, this.numberAnswers, this.answer1, this.answer2, this.answer3, this.answer4)
    .subscribe(res=> {
      console.log(res);
      this.router.navigateByUrl('/home');
      //TODO: insert alert here
    }, err=> {
      console.log(err);
    });
  }
}
