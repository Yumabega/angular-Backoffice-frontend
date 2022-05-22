import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login/login.service';
import { StorageService } from 'app/services/login/storage.service';
import { LoginObject } from '@shared/models/login-object.model';
import { SessionI } from '@shared/models/session-i.model';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dav-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public errorForm: { code: number; message: string } = { code: 0, message: '' };
  public hide:boolean = true;
  public initialized:boolean = false;
  public loginForm!: FormGroup;
  public submitted: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: LoginService,
    private storageService: StorageService,
    private router: Router
  ) {}

  correctLogin(data: SessionI) {
    this.storageService.setCurrentSession(data);

    this.router.navigate(['/home']);
  }

  getErrorMessage(){
    let msg = ''
    if(this.loginForm.controls?.['emailField']?.hasError('required') ||
       this.loginForm.controls?.['password']?.hasError('required')){
        msg =  'Campo requerido';
    }
    else{
      switch(this.errorForm.code) { 
        // when error code is 0 does not exist error.
        case 0: { 
          //statements; 
          msg = this.loginForm.controls?.['emailField']?.hasError('email') ? 'Email no válido': '';
          break; 
        } 
        default: { 
          msg = this.errorForm.message; 
          break; 
        } 
      } 
    }
    
    return msg;
  }

  ngOnInit() {
    this.buildForm()
  }

  
  public submitLogin(): void {
    this.submitted = true;
    this.errorForm = { code: 0, message: '' };
    // If form field are valid
    if (this.loginForm.valid) {
      this.authenticationService
        .loginDav(new LoginObject(this.loginForm.value))
        .subscribe({
          next: (data: any) => {
            this.correctLogin(data);
          },
          error: (err: any) => {
            
            this.errorForm = err;
          },
        }); 
    }
  }

  private buildForm(){
    this.loginForm = this.formBuilder.group({
      networkUser: ['',  Validators.required],
      password: ['', Validators.required],
    });
  }

  get isInvalidNetworkUser(){
    return this.submitted  && this.loginForm.controls?.['networkUser']?.invalid;
  }
  get isInvalidPassword(){
    return this.submitted  && this.loginForm.controls?.['password']?.invalid;
  }
}
