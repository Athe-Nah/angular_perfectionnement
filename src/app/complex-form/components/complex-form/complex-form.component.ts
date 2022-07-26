import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {

  showEmailCtrl$!:Observable<boolean>;
  showPhoneCtrl$!:Observable<boolean>;

  mainForm!:FormGroup;
  personalInfoForm!:FormGroup;
  loginInfoForm!:FormGroup;

  emailForm!:FormGroup;

  contactPreferenceCtrl!:FormControl;
  confirmEmailCtrl!:FormControl;
  emailCtrl!:FormControl;
  phoneCtrl!:FormControl;

  passwordCtrl!:FormControl;
  confirmPasswordCtrl!:FormControl;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }

  private initMainForm():void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference:this.contactPreferenceCtrl,
      email: this.emailForm,
      phone:this.phoneCtrl,
      loginInfo:this.loginInfoForm
    }); // Vide car on va le remplir au fur et a mesure
  }

  private initFormControls():void {
    this.personalInfoForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
    });
    /* independant donc control direct, pas de formbuild*/
    this.contactPreferenceCtrl = this.formBuilder.control('phone');

    this.confirmEmailCtrl = this.formBuilder.control('');
    this.emailCtrl = this.formBuilder.control('');

    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl,
  })

    this.phoneCtrl = this.formBuilder.control('');
    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);

    this.loginInfoForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    })

  }
  private initFormObservables(){
    this.showEmailCtrl$=this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference ==='email'),
    );
      this.showPhoneCtrl$=this.contactPreferenceCtrl.valueChanges.pipe(
        startWith(this.contactPreferenceCtrl.value),
      map(preference => preference ==='phone'), 
      tap(showPhoneCtrl =>{
        if(showPhoneCtrl){
          // add validator
          this.phoneCtrl.addValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
        }else{
          //remove validator
          this.phoneCtrl.clearValidators();
        }
        this.phoneCtrl.updateValueAndValidity();
      })
    );
  }

  onSubmitForm(){
    console.log(this.mainForm.value);
  }
}
