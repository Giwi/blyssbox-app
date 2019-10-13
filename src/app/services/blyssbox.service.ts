import { Injectable } from '@angular/core';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlyssboxService {
  private readonly handleError: HandleError;
  private uri = 'http://localhost:8001/ui/v';
  private httpOptions = {
    headers: new HttpHeaders({
      'If-Modified-Since': 'Mon, 27 Mar 1972 00:00:00 GMT',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
      Accept: 'application/json; charset=utf-8',
    })
  };

  constructor(
    private logger: NGXLogger,
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler,
    private userService: UserService
  ) {
    this.handleError = httpErrorHandler.createHandleError('BlyssboxService');
  }

  login(login: string, password: string): Observable<any> {
    return this.http.post(this.uri + '2/auth', { login, password, ihm: 'fx' }, this.httpOptions)
      .pipe(catchError(this.handleError<any>('login')))
      .pipe(
        mergeMap(response => {
          if (response) {
            return this.userService.login({
              sessionId: response.sessionId,
              user: response.user,
              gateway: response.gateway,
              popups: response.popups
            });
          } else {
            return undefined;
          }
        })
      );
  }

  getFavorites() {
    return this.http.get(this.uri + '2/favorite;jsessionid=' + this.userService.getSession(), this.httpOptions)
      .pipe(catchError(this.handleError<any>('getFavorites')))
      .pipe(map(response => response.favorites || []));
  }

  getDevices(category: string, subCategory: string) {
    return this.http.post(this.uri + '5/device;jsessionid=' + this.userService.getSession(), {
      capability: ['ACTUATOR', 'IN_TEMP', 'IN_HUM']
    }, this.httpOptions)
      .pipe(catchError(this.handleError<any>('getDevices')))
      .pipe(map(response => (response.devices || [])
        .filter(d => d.categories.filter(c => c.value === category).length > 0)
      ));
  }

  getAllDevices() {
    return this.http.post(this.uri + '5/device;jsessionid=' + this.userService.getSession(), {
      capability: ['ACTUATOR', 'IN_TEMP', 'IN_HUM']
    }, this.httpOptions)
      .pipe(catchError(this.handleError<any>('getDevices')))
      .pipe(map(response => response.devices || []));
  }

  getDevice(serial: string, category: string, subCategory: string) {
    return this.getDevices(category, subCategory).pipe(map(devices => devices.filter(d => d.serial === serial)));
  }

  setFavoriteStart(serial: number) {
    return this.http.put(this.uri + '2/favorite/' + serial + '/start;jsessionid=' + this.userService.getSession(), {}, this.httpOptions)
      .pipe(catchError(this.handleError<any>('setFavoriteStart')))
      .pipe(map(response => response));
  }

  setFavoriteStop(serial: number) {
    return this.http.put(this.uri + '2/favorite/' + serial + '/stop;jsessionid=' + this.userService.getSession(), {}, this.httpOptions)
      .pipe(catchError(this.handleError<any>('setFavoriteStop')))
      .pipe(map(response => response));
  }

  setDeviceStatus(serial: string, status: string) {
    return this.http.put(this.uri + '2/device/status;jsessionid=' + this.userService.getSession(), { serial, status }, this.httpOptions)
      .pipe(catchError(this.handleError<any>('setDeviceStatus')))
      .pipe(map(response => response));
  }

  getHistory(startDate, max, endDate, page) {
    return this.http.post(this.uri + '2/history;jsessionid=' + this.userService.getSession(), {
      startDate,
      max,
      endDate,
      page
    }, this.httpOptions)
      .pipe(catchError(this.handleError<any>('getHistory')))
      .pipe(map(response => response));
  }

  getGatewayConnection()  {
    return this.http.get(this.uri + '2/gateway/connection;jsessionid=' + this.userService.getSession(), this.httpOptions)
      .pipe(catchError(this.handleError<any>('getGatewayConnection')))
      .pipe(map(response => response));
  }

  setGatewayReboot() {
    return this.http.put(this.uri + '2/gateway/reboot;jsessionid=' + this.userService.getSession(), {}, this.httpOptions)
      .pipe(catchError(this.handleError<any>('getGatewayConnection')))
      .pipe(map(response => response));
  }
}
