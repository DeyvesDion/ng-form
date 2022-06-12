import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { User } from './user';


function ratingRangeValidator(c: AbstractControl): { [key: string]: boolean } | null{
  // different de null (!!c.value)
  if (!!c.value && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return {'RangeError': true};
  }
  return null
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
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      rating:[null, ratingRangeValidator],
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
