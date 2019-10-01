import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from '../../services/message-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	question: any;
	authenticated = false;
	feature = false;

	constructor(private messageService: MessageServiceService, private authService: AuthService){

	}

	ngOnInit(){
		this.authService.getUserSubject().subscribe(authState=> {
			this.authenticated = authState ? true : false;
		});
		this.authService.getFeatureSubject().subscribe(authState=> {
			this.feature = authState ? true : false;
			this.fillFeaturedQuestion();
		})
	}

	async fillFeaturedQuestion(){
		await this.messageService.getFeaturedQuestion()
			.subscribe(res=> {
				this.question = res;
				console.log(res);
			}, err=> {
				console.log(err);
			});
	}

}
