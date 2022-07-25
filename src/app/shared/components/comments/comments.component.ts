import { state, trigger, style, transition, animate, query, group, stagger, animateChild, useAnimation } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {Comment} from '../../../core/models/comment.model'
import { slideAndFadeAnimation } from '../../animations/slide-and-fade.animation';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('list',[
      transition(':enter', [
        query('@listItem',[
          stagger(100, [
            animateChild()
          ])
        ])
      ] ),
    ]),
    trigger('listItem', [
      state ( 'default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state ( 'active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgba(85, 60, 154, 0.3)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
      transition('void => *', [
        query('.conmment-text, .comment-date', style({
          opacity:0
        })),
        useAnimation(slideAndFadeAnimation),
        group([
          query('.comment-text', [
            animate('500ms', style({
              opacity:1
            }))
          ]),
          query('.comment-date', [
            animate('1000ms', style({
              opacity:1
            }))
          ]),
        ]),
      ])
    ])
  ]
})
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCtrl!:FormControl;
  animationState:{[key:number] : 'default' | 'active'} = {} ;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl=this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
    for (let index in this.comments) {
      this.animationState[index] = 'default';
    }
  }

  onLeaveComment(){
    if(this.commentCtrl.invalid){
      return;
    }
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
      id: maxId+1,
      comment: this.commentCtrl.value,
      createdDate: new Date().toISOString(),
      userId:1
    })
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();
  }

  onListItemMouseEnter(index:number) {
    this.animationState[index] = 'active';
  }
  onListItemMouseLeave(index:number) {
    this.animationState[index] = 'default';
  }

}
