import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {AlertService} from './alert.service';
import {Observable, of} from 'rxjs';
import {TypeDay} from 'src/app/shared/models/type-day';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeDayOffService {

  private serverUrl = environment.apiUrl +  '/';

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json',
      Authorization: 'Bearer'
    })
  };

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(`${operation} failed" ${error.message}`);

      return of(result as T);
    };
  }

  /** GET all type of day off from server */
  getAllTypes(): Observable<TypeDay[]> {
    return this.http.get<TypeDay[]>(`${this.serverUrl}day_off_types`).pipe(
      catchError(this.handleError<TypeDay[]>('getAllTypes'))
    );
  }
}
