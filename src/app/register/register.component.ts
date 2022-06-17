import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from './user';


function ratingRangeValidator(min:number, max:number):ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
  
    if (c.value != null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'RangeError': true };
    }
    return null;
  };
}

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null{
  const emailControl:any = c.get('email');
  const emailConfirmControl:any = c.get('confirmEmail');

if (emailControl.pristine || emailConfirmControl.pristine) {
  return null;
}

  if (emailControl.value===emailConfirmControl.value) {
    return null;
  }
  return {'match': true};
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup|any;

public user: User = new User();

  constructor(private fb: FormBuilder) {

   }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.maxLength(25)]],

      // Email formeGroup(email & confirmEmail)
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail:['', Validators.required],
      },{Validators:"emailMatcher"}),
      // End Email FormGroup
      phone: '',
      rating:[null, ratingRangeValidator(1, 5)],
      notification:'email',
      sendCatalog: false,
    });
  }

  public saveData(): void {
    console.log('valeur du formulaire', JSON.stringify(this.registerForm.value))
  }

  public fillFormData(): void {
    this.registerForm.setValue({
    
      firstName: ' Doe B',
      lastName: 'John',
      email: 'jdoe@test.com',
      phone: '123',
      rating:'3',
      notification:'email',
      sendCatalog:'true' 
  })
}
  public setNotificationSetting(method: string): void {

    const phoneControl = this.registerForm.get('phone');
    if (method =='text') {
      phoneControl.setValidators(Validators.required); 
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
}

}
