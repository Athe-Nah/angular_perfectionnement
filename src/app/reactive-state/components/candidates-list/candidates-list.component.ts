import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { CandidateSearchType } from '../../enum/candidate-search-type.enum';
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

  searchCtrl!:FormControl;
  searchTypeCtrl!:FormControl;
  searchTypeOptions!: {
    value: CandidateSearchType,
    label:string
  }[];

  constructor(
    private candidateService : CandidateService, 
    private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.candidateService.getCandidatesFromServer();
  }
private initForm() {
  this.searchCtrl = this.formBuilder.control('');
  this.searchTypeCtrl = this.formBuilder.control(CandidateSearchType.LASTNAME);
  this.searchTypeOptions = [
    {value: CandidateSearchType.LASTNAME, label: 'Nom'},
    {value: CandidateSearchType.FIRSTNAME, label: 'Prénom'},
    {value: CandidateSearchType.COMPANY, label: 'Entreprise'}
  ]
}


  private initObservables() {
    this.loading$ = this.candidateService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value), 
      map(value => value.toLowerCase())
    );
    const searchType$:Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );
    this.candidates$ = combineLatest([
      search$, 
      searchType$,
      this.candidateService.candidates$
    ]).pipe(
      map(
        ([search, searchType, candidates]) => 
        candidates
          .filter(candidate => candidate[searchType]
          .toLowerCase()
          .includes(search as string)))
      );
  }



}
