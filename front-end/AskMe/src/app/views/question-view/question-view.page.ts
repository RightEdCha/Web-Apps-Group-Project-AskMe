import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from '../../services/message-service.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.page.html',
  styleUrls: ['./question-view.page.scss'],
})
export class QuestionViewPage implements OnInit {

  Chart: any;
  
  @ViewChild('Canvas') Canvas;
	
  authenticated = false;
  question: any;
  answer = '';
  view;

  constructor(private messageService: MessageServiceService, public loadingController: LoadingController, public route: ActivatedRoute,
  public router: Router, private authService: AuthService) { }

  ngOnInit() {
		this.fillQuestionBox();
  }
  ngAfterViewInit(){
    this.createBarGraph();
  }
  fillQuestionBox(){
		this.messageService.getQuestion(this.route.snapshot.paramMap.get('questionId'))
			.subscribe(res=> {
				this.question = res;
				console.log(res);
			}, err=> {
				console.log(err);
			});
  }

  async submitAnswer(){
    const loading = await this.loadingController.create({
		});
		console.log(this.answer);
		await loading.present();
		await this.messageService.increaseVoteCount(this.route.snapshot.paramMap.get('questionId'),this.answer)
			.subscribe(res=> {
				console.log(res);
				loading.dismiss();
			}, err=> {
				console.log(err);
				loading.dismiss();
      });
	}
	
	setAnswer(event){
		this.answer = event.target.id;
	}
createBarGraph(){
	let labels = [];
	let data = [];
	this.question.answers.forEach(function(value){labels.push(value.answerText) 
		data.push(value.voteCount) })
	this.Chart = new Chart(this.Canvas.nativeElement, {
		type: 'horizontalBar',
		data: {
				labels: labels,
				datasets: [{
						label: '# of Votes',
						size: 1,
						data: data,
						backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)'
						],
						borderColor: [
								'rgba(255,99,132,1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)'
						],
						borderWidth: 1
				}]
		},
		options: {
				scales: {
						xAxes: [{
								ticks: {
										beginAtZero:true
								}
						}]
				}
		}
});
}
createPieGraph(){
	let labels = [];
	let data = [];
	let totalCount = 0;
	this.question.answers.forEach(function(value){labels.push(value.answerText) 
		data.push(value.voteCount)});
	this.Chart = new Chart(this.Canvas.nativeElement, {
		type: 'doughnut',
		data: {
				labels: labels,
				datasets: [{
						label: '# of Votes',
						data: data,
						backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)'
						],
						hoverBackgroundColor: [
								"#FF6384",
								"#36A2EB",
								"#FFCE56",
								"#FF6384",
								"#36A2EB",
								"#FFCE56"
						]
				}]
		}

	});
}
changeView(){
		console.log(this.view);
		if (this.view === true)
		{
			this.Chart.destroy();
			this.createPieGraph();
		}
		else
		{
			this.Chart.destroy();
			this.createBarGraph();
		}
	}
}
