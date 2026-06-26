import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BugForm, BugItem, BugStatus, BugSummary } from './bug.model';

@Injectable({ providedIn: 'root' })
export class BugApiService {
  private readonly baseUrl = `${environment.apiUrl}/bugs`;

  constructor(private readonly http: HttpClient) {}

  getBugs(status?: BugStatus): Observable<BugItem[]> {
    const params = status ? new HttpParams().set('status', status) : undefined;
    return this.http.get<BugItem[]>(this.baseUrl, { params });
  }

  getSummary(): Observable<BugSummary[]> {
    return this.http.get<BugSummary[]>(`${this.baseUrl}/summary`);
  }

  createBug(payload: BugForm): Observable<BugItem> {
    return this.http.post<BugItem>(this.baseUrl, payload);
  }

  updateBug(id: number, payload: BugForm): Observable<BugItem> {
    return this.http.put<BugItem>(`${this.baseUrl}/${id}`, payload);
  }

  deleteBug(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
