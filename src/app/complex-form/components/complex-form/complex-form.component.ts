import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {

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
  }

  private initMainForm():void {
    this.mainForm = this.formBuilder.group({}); // Vide car on va le remplir au fur et a mesure
  }

  private initFormControls():void {
    this.personalInfoForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
    });
    /* independant donc control direct, pas de formbuild*/
    this.contactPreferenceCtrl = this.formBuilder.control('email');

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




  onSubmitForm(){

  }

}
