import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestType } from '../../shared/models/request-type';
import { environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestTypeService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private url = `${environment.apiUrl}/request-types`

  constructor(private httpClient: HttpClient) { }

  getRequestTypes() : Observable<RequestType[]>{
    return this.httpClient.get<RequestType[]>(this.url);
  }

  postRequestType(nameRequestType : string): Observable<RequestType>{
    return this.httpClient.post<RequestType>(this.url, nameRequestType);
  }

  deleteRequestType(id : number): Observable<RequestType>{
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete<RequestType>(deleteUrl);
  }

  putRequestType(requestType: RequestType): Observable<RequestType[]>{
    return this.httpClient.put<RequestType[]>(this.url, requestType);
  }
}
