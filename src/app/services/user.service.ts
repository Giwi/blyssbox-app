import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { NGXLogger } from 'ngx-logger';
import { Connection, MessageBus } from 'ngx-message-bus';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: {
    sessionId: string,
    user: any,
    gateway: any,
    popups: any,
  };
  private USER_DATA = 'blyss';
  private myConnection: Connection;


  constructor(
    private messageBus: MessageBus,
    private storageMap: StorageMap,
    private logger: NGXLogger,
  ) {
    this.myConnection = this.messageBus.connect('blyss', 'UserService');
  }

  login(userData: any): Promise<any> {
    this.userData = userData;
    this.logger.debug('UserService', 'login');
    return new Promise<any>((resolve, reject) => {
      this.storageMap.set(this.USER_DATA, userData).subscribe(() => {
        this.logger.debug('UserService', 'login', userData);
        this.myConnection.post({
          recipientIds: null,
          payload: this.userData,
          groupId: 'user:login'
        });
        resolve(this.userData);
      }, err => reject(err));
    });
  }

  logout(): Promise<any> {
    this.logger.debug('UserService', 'logout');
    return new Promise<any>((resolve, reject) => {
      this.storageMap.delete(this.USER_DATA).subscribe(() => {
        this.logger.debug('UserService', 'logout', 'evt');
        this.myConnection.post({
          recipientIds: null,
          payload: false,
          groupId: 'user:logout'
        });
        resolve();
      }, err => reject(err));
    });
  }

  isLoggedIn(): Promise<any> {
    this.logger.debug('UserService', 'isLoggedIn');
    return new Promise<any>((resolve, reject) => {
      this.storageMap.get(this.USER_DATA).subscribe((value: any) => {
        this.logger.debug('UserService', 'isLoggedIn', value);
        if (!!value && !!value.sessionId) {
          this.userData = value;
          resolve(this.userData);
        } else {
          resolve(false);
        }
      }, err => reject(err));
    });
  }

  getSession() {
    return (this.userData || { sessionId: '' }).sessionId;
  }
}
