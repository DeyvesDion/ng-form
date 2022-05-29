import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { User } from './user';

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
      firstName: [''],
      lastName: '',
      email: '',
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

}
