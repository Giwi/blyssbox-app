import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData: {
    sessionId: string,
    user: any,
    gateway: any,
    popups: any,
  };
  USER_DATA = 'blyss';


  constructor(
    private events: Events,
    private storage: Storage
  ) {
  }

  login(userData: any): Promise<any> {
    this.userData = userData;
    return this.storage.set(this.USER_DATA, userData).then(() => {
      this.events.publish('user:login');
      return this.userData;
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.USER_DATA)
      .then(() => {
        this.events.publish('user:logout');
      });
  }

  isLoggedIn(): Promise<any> {
    return this.storage.get(this.USER_DATA).then((value) => {
      if (!!value.sessionId) {
        this.userData = value;
        return this.userData;
      } else {
        return false;
      }
    });
  }

  getSession() {
    return (this.userData || { sessionId: '' }).sessionId;
  }
}
