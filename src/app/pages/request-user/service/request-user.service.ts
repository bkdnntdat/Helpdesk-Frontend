import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "src/app/core/services/auth.service";
import { Request } from "../../../shared/models/request";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root"
})
export class RequestUserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllRequestType(): Observable<Request> {
    const api = `${environment.apiUrl}/request-types`;
    return this.http.get<Request>(api);
  }

  postRequest(request: Request): Observable<any> {
    const api = `${environment.apiUrl}/requests`;
    return this.http.post(api, request);
  }

  getRequestOfMe():Observable<Request>{
    const api = `${environment.apiUrl}/requests/me`;
    return this.http.get<Request>(api);
  }
}
