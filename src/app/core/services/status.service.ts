import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from 'src/app/shared/models/status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private url = `${environment.apiUrl}/status`

  constructor(private httpClient: HttpClient) { }

  public getStatusList():Observable<Status[]>{
    return this.httpClient.get<Status[]>(this.url);
  }
}
