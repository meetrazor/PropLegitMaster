import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from '../core/services/cookie.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpFileUploadOptions = {
  headers: new HttpHeaders()
};

const baseurl = `http://devapi.proplegit.com/`;
const apiUrl = `${baseurl}api/`;
const register = `${apiUrl}login/register`;
const generateOTP = `${apiUrl}generate/otp/`;
const validateOTP = `${apiUrl}validate/otp/`;
const login = `${apiUrl}login/verify`;
const stateWiseProperty = `${apiUrl}property/list`;
const PropertyListByState = `${apiUrl}property/list/`;
const deleteProperty = `${apiUrl}property/delete/`;
const stateInfo = `${apiUrl}state/list`;

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private userID: number;
  private user;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  userRegister(userData): any {
    return this.http.post(register, userData, httpOptions);
  }

  getUserID() {
    return this.userID;
  }

  setUserID(userid: number) {
    this.userID = userid;
  }

  generateOTP(id, data): any {
    return this.http.post(`${generateOTP}${id}`, data, httpOptions);
  }

  validateOTP(data): any {
    return this.http.post(validateOTP, data, httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  login(data) {

    return this.http.post<any>(login, data, httpOptions)
      .pipe(map(user => {
        // tslint:disable-next-line: triple-equals
        if (user.error && user.status != 200) {
          return user;
        } else {
          this.user = user;
          this.cookieService.setCookie('currentUser', JSON.stringify(user.data), 1);
          return user;
        }
      }));
  }

  logout() {
    this.cookieService.deleteCookie('currentUser');
    this.user = null;
  }

  getStateWisePropertyCount(): any {
    return this.http.get(stateWiseProperty, httpOptions);
  }

  getPropertyListByState(id): any {
    return this.http.get(`${PropertyListByState}${id}`, httpOptions);
  }
  deleteProperty(id): any {
    return this.http.delete(`${deleteProperty}${id}`, httpOptions);
  }
  states() {
    return this.http.get<any>(stateInfo, httpOptions);
  }
  districts(id): any {
    return this.http.get(`${apiUrl}state/list/${id}`, httpOptions);
  }
  talukas(id): any {
    return this.http.get(`${apiUrl}district/list/${id}`, httpOptions);
  }
  villages(id): any {
    return this.http.get(`${apiUrl}taluka/list/${id}`, httpOptions);
  }
  addproperty(data): any {
    return this.http.post(`${apiUrl}property/add`, data, httpOptions);
  }
  propertytype(): any {
    return this.http.get(`${apiUrl}propertytype/list`, httpOptions);
  }
  area(search): any {
    return this.http.get(`${apiUrl}area/list/` + search, httpOptions);

  }
  Addphotograph(PropertyID, data): any {
    return this.http.post(`${apiUrl}property/${PropertyID}/document/add`, data);
  }

  listphotograph(PropertyID): any {
    return this.http.get<any>(`${apiUrl}property/${PropertyID}/photograph`)
      .pipe(map(responce => {
        if (responce.error && responce.status !== 200) {
          return responce;
        } else {
          return responce.data;
        }
      }));
  }
}
