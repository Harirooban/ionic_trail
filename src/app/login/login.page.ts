import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	loginForm: FormGroup;

	error_messages = {
		'email' : [
			{ type : 'required', message:'Email is required.'},
			{ type : 'minLength', message:'minimum 6 characters is must'},
			{ type : 'maxLength', message:'maximum 50 characters is allowed'},
			{ type : 'pattern', message:'please enter the valid Email ID'}
		],
		
	}

  constructor(public formBuilder: FormBuilder, private router: Router ) 
          { 
  	        this.loginForm = this.formBuilder.group
                ({
  		              password: new FormControl('',Validators.required	),
  		              email: new FormControl('', Validators.compose(
                      [
                				Validators.required,
                				Validators.minLength(6),
                				Validators.maxLength(50),
                				Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  			              ]
                  ) )
  	            });
          }
 
  second()
  {
    this.router.navigate(['welcome']);
  }
  ngOnInit() {
  }

login() {
	console.log('email : ', this.loginForm.value.email);
	console.log('password :', this.loginForm.value.password);
}


}
