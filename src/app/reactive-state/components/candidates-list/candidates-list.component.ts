import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../../models/candidate.models';
import { CandidateService } from '../../services/candidates.services';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {

  loading$!:Observable<boolean>;
  candidates$!:Observable<Candidate[]>;

  constructor(private candidateService : CandidateService) { }

  ngOnInit(): void {
    this.initObservables();
    this.candidateService.getCandidatesFromServer();
  }

  private initObservables() {
    this.loading$ = this.candidateService.loading$;
    this.candidates$ = this.candidateService.candidates$;
  }
}
