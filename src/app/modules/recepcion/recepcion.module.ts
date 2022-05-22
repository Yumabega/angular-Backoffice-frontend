import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepcionRoutingModule } from './recepcion-routing.module';
import { RecepcionComponent } from './recepcion.component';
import { MaterialModule } from '@shared/my-angular-material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {GuiaEstilosGlobalModule} from 'guia-estilos-global';



@NgModule({
  declarations: [
    RecepcionComponent,
  ],
  imports: [
    CommonModule,
    RecepcionRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    GuiaEstilosGlobalModule
  ]
})
export class RecepcionModule { }
