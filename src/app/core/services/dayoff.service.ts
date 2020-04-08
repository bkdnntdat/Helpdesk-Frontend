import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AlertService } from './alert.service';
import { DayOff } from 'src/app/shared/models/day-off';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayoffService {
  private dayOffUrl = environment.apiUrl + "/day_offs"

  httpOptions = {
    headers: new HttpHeaders({
      'Context-Type': 'application/json',
      'Authorization': 'Bearer '
    })
  };

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(`${operation} failed: ${error.alertService}`);
      return of(result as T);
    }
  }

  getDayoffs(): Observable<DayOff[]> {
    return this.http.get<DayOff[]>(this.dayOffUrl).pipe(
      catchError(this.handleError<DayOff[]>('getDayOffs'))
    )
  }

  getDayOff(id: number): Observable<DayOff> {
    const url = `${this.dayOffUrl}/${id}`;
    return this.http.get<DayOff>(url).pipe(
      catchError(this.handleError<DayOff>(`getDayOff id=${id}`))
    );
  }
  getDayOffByUser(id: number, year: number): Observable<DayOff[]> {
    const url = `${this.dayOffUrl}/user_of_year/${id}?year=${year}`;
    return this.http.get<DayOff[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<DayOff[]>('deleteDayOff'))
    );
  }

  deleteDayOff(dayoff: DayOff | number): Observable<DayOff> {
    const id = typeof dayoff === 'number' ? dayoff : dayoff.id;
    const url = `${this.dayOffUrl}/${id}`;

    return this.http.delete<DayOff>(url, this.httpOptions).pipe(
      catchError(this.handleError<DayOff>('deleteDayOff'))
    );
  }

  acceptDayOff(dayoff: DayOff | number): Observable<DayOff> {
    const id = typeof dayoff === 'number' ? dayoff : dayoff.id;
    const url = `${this.dayOffUrl}/accept/${id}`;
    return this.http.put<DayOff>(url, this.httpOptions).pipe(
      catchError(this.handleError<DayOff>('acceptDayOff'))
    );
  }

  rejectDayOff(dayoff: DayOff | number): Observable<DayOff> {
    const id = typeof dayoff === 'number' ? dayoff : dayoff.id;
    const url = `${this.dayOffUrl}/rejected/${id}`;
    return this.http.put<DayOff>(url, this.httpOptions).pipe(
      catchError(this.handleError<DayOff>('rejectDayOff'))
    );
  }

}
