import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private userID: number;

  constructor(private http: HttpClient) { }

  userRegister(userData): any {
    return this.http.post(register, userData, httpOptions);
  }

  getUserID() {
    return this.userID;
  }

  setUserID(userid: number) {
    this.userID = userid;
  }

  generateOTP(id, data) {
    return this.http.post(`${generateOTP}${id}`, data, httpOptions);
  }

}
