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
  HAS_LOGGED_IN = 'hasLoggedIn2';


  constructor(
    private events: Events,
    private storage: Storage
  ) {
  }

  login(userData: any): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, userData).then(() => {
      this.userData = userData;
      return this.events.publish('user:login');
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN)
      .then(() => this.events.publish('user:logout'));
  }

  isLoggedIn(): Promise<any> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      this.userData = value;
      console.log(this.userData);
      return this.userData;
    });
  }

  getSession() {
    console.log(this.userData);
    return (this.userData || { sessionId: '' }).sessionId;
  }
}
