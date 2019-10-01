import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from '../../services/message-service.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  username:string = '';
  password:string = '';
  firstName:string = '';
  lastName:string = '';
  email:string = '';
  userData: any;

  authenticated = false;

  constructor(private messageService: MessageServiceService, private alertController: AlertController, public route: ActivatedRoute,
    public router: Router, private authService: AuthService) { }

  ngOnInit() {
	this.authService.getUserSubject().subscribe(authState=> {
    this.authenticated = authState ? true : false;
    this.updateProfile();
  });
}

  updateProfile(){

  // this.firstName, this.lastName, this.email,
    this.messageService.getLogIn(this.authService.getUsername(), this.authService.getPassword())
    .subscribe(res=> {
      this.userData = res;
      console.log(this.userData);
      // this.router.navigateByUrl('/home')
    }, err=> {
      console.log("Error");
    });
 }


  updateUserInfo(){
    if(this.firstName.length != 0){
      this.userData.fname = this.firstName;
    }
    if(this.lastName.length != 0){
      this.userData.lname = this.lastName;
    }
    if(this.email.length != 0){
      this.userData.email = this.email;
    }
    if(this.password.length != 0){
      this.userData.password = this.password;
    }

  
    this.messageService.updateProfile(this.userData.fname, this.userData.lname, this.userData.email, 
      this.userData.username, this.userData.password)
     .subscribe(res=> {
       this.messageService.getLogIn(this.userData.username, this.userData.password)
       .subscribe(res=> {
         this.authService.saveSession(res);
         this.router.navigateByUrl('account');
       });
     }, err=> {
       console.log("error in update-profile page")
     });
 }
}