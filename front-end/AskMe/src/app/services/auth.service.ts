import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageServiceService } from './message-service.service'

export interface User{
  name: string;
  password: string;
  roles: string[];
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
  feature: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor() { }

  saveSession(res:any) {
    res.admin;
    if (!res.admin) {
      this.currentUser.next({
        name: res.username,
        password: res.password,
        roles: ['user']
      });
    }
    else if (res.admin) {
      this.currentUser.next({
        name: res.username,
        password: res.password,
        roles: ['admin']
      });
    }
  }

  getUserSubject() {
    return this.currentUser.asObservable();
  } 

  killSession() {
    this.currentUser.next(null);
  }

  getFeatureSubject() {
    return this.feature.asObservable();
  }
  featureThis() {
    this.feature.next(null);
  }

  getUsername():string{
    return this.currentUser.value.name;
  }

  getPassword():string{
    return this.currentUser.value.password;
  }

  hasRole(roles: string[]):boolean {
    for (const oneRole of roles){
      if(!this.currentUser.value || !this.currentUser.value.roles.includes(oneRole)){
        return false;
      }
      return true;
    }
  }
}
