import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SettingRoutingModule } from './setting-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../../shared/shared.module';
import { InformationComponent } from './information/information.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RegisterComponent } from './register/register.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [ProfileComponent, InformationComponent , RegisterComponent],
  imports: [
    CommonModule,
    NgbModule,
    Ng2SmartTableModule,

    ReactiveFormsModule,
    SettingRoutingModule,
    SharedModule,
    CarouselModule,
    FormsModule,
    DropzoneModule
    

    
  ]
})
export class SettingModule { }
