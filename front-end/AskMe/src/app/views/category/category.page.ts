import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from '../../services/message-service.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  questions: any = {};
  totQuest: any;
  category: any;
  authenticated = false;

  constructor(private messageService: MessageServiceService, public loadingController: LoadingController, public route: ActivatedRoute,
  public router: Router, private authService: AuthService) { }

  ngOnInit() {
	this.authService.getUserSubject().subscribe(authState=> {
		this.authenticated = authState ? true : false;
		this.getTotalQuestByCategory();
		this.category = this.route.snapshot.paramMap.get('category');
	});
  }

  	async getTotalQuestByCategory(){
  		const loading = await this.loadingController.create({
		});
		await loading.present();
		await this.messageService.getTotQuestCat(this.route.snapshot.paramMap.get('category'))
			.subscribe(res=> {
				this.totQuest = res;
				console.log(res);
				this.fillViewByCategory(1);
				loading.dismiss();
			}, err=> {
				console.log(err);
				loading.dismiss();
			});
  	}
	async fillViewByCategory(pageNum:number){
		await this.messageService.getQuestionsByCategory(this.route.snapshot.paramMap.get('category'),pageNum)
			.subscribe(res=> {
				this.questions = res;
				console.log(res);
			}, err=> {
				console.log(err);
			});
	}
	async remove(event) {
		await this.messageService.deleteQuestion(event.target.id)
		.subscribe(res=> {
			this.authService.featureThis();
			this.router.navigateByUrl('home');
			this.questions = res;
			console.log(res);
		}, err=> {
			console.log(err);
		});
	}
	async setFeature(event) {
		this.messageService.getFeaturedQuestion().subscribe(res1 => {
			console.log(res1);
			this.messageService.unfeatureQuestion(res1.questionId).subscribe(res2=> {
				console.log(res2);
				this.messageService.setFeaturedQuestion(event.target.id).subscribe(res3 => {
					console.log(res3);
					this.authService.featureThis();
					this.router.navigateByUrl('/home');
				});
			});
		});
	}
}
