import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveStateRoutingModule } from './reactive-state-routing.module';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { SingleCandidateComponent } from './components/single-candidate/single-candidate.component';
import { CandidateService } from './services/candidates.services';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CandidatesListComponent,
    SingleCandidateComponent
  ],
  imports: [
    CommonModule,
    ReactiveStateRoutingModule,
    SharedModule
  ],
  providers: [
    CandidateService
  ]
})
export class ReactiveStateModule { }
