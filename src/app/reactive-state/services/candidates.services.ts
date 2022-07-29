import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidate } from '../models/candidate.models';

@Injectable()
export class CandidateService {
  constructor(private http: HttpClient) {}

  //Loading
  private _loading$ = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  //Candidate
  private _candidates$ = new BehaviorSubject<Candidate[]>([]);

  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }

  //Mise a jour du status
  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }

  private lastCandidatesLoad=0;

  getCandidatesFromServer() {
    if (Date.now() -this.lastCandidatesLoad<=300000){
      return;
    }
    this.setLoadingStatus(true);
    this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
      tap(candidates => {
        this.lastCandidatesLoad=Date.now();
        this._candidates$.next(candidates);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  getCandidatebyId(id: number): Observable<Candidate> {
    if(!this.lastCandidatesLoad){
      this.getCandidatesFromServer();
    }
    return this.candidates$.pipe(
      map(candidates => candidates.filter(candidate => candidate.id == id)[0])
    )

  }
}
