import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { NgZorroImportsModule } from 'src/app/NgZorroImportsModule';
import { HttpClientModule } from '@angular/common/http';
import { UpdateAdComponent } from './components/update-ad/update-ad.component';
import { SearchAdComponent } from './components/search-ad/search-ad.component';


@NgModule({
  declarations: [
    AdminDashbordComponent,
    UpdateAdComponent,
    SearchAdComponent,
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroImportsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
