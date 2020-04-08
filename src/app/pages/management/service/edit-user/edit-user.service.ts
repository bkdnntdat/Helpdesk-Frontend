import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../../../../core/services/auth.service";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class EditUserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  disableFollowIdUser(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.authService.getAuthentication()
      })
    };

    let api = environment.apiUrl + "/users/disable?idUser=" + id;
    return this.http.put(api, httpOptions);
  }

  enableFollowIdUser(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + this.authService.getAuthentication()
      })
    };
    let api = environment.apiUrl + "/users/enable?idUser=" + id;
    return this.http.put(api, httpOptions);
  }
}
