import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component'
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { ConcatPipe } from './pipes/concat.pipe';
import { timeAgoPipe } from './pipes/time-ago.pipe';
import { HighLightDirective } from './directives/highlight.directive';



@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    ConcatPipe,
    timeAgoPipe,
    HighLightDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    CommentsComponent,
    MaterialModule,
    ReactiveFormsModule,
    ShortenPipe,
    ConcatPipe,
    timeAgoPipe,
    HighLightDirective

  ]
})
export class SharedModule { }
