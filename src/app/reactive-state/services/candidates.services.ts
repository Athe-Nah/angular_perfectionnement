import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
}
