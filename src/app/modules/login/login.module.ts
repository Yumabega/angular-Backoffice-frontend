import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from '@modules/login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';

import { MaterialModule } from '@shared/my-angular-material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '@modules/login/components/form/form.component';
import { TitleComponent } from '@modules/login/components/title/title.component';
import {GuiaEstilosGlobalModule} from 'guia-estilos-global';
@NgModule({
  declarations: [
    LoginComponent,
    TitleComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    GuiaEstilosGlobalModule
  ]
})
export class LoginModule { }
