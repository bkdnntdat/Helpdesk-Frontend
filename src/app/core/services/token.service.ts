import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  readonly jwtToken = 'currentUser';

  saveToken(token: string) {
    localStorage.setItem('token', this.jwtToken);
  }

  getToken(): string {
    return localStorage.getItem[this.jwtToken];
  }

  clearToken(): void {
    localStorage.removeItem(this.jwtToken);
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    return JSON.parse(jsonPayload);
}
}
