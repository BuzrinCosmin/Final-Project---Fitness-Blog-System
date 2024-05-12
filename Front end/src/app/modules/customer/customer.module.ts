import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { NgZorroImportsModule } from 'src/app/NgZorroImportsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchAdComponent } from './components/search-ad/search-ad.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ViewPostComponent } from './components/view-post/view-post.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ClickedPostComponent } from './clicked-post/clicked-post.component';
import { CommentComponent } from './comment/comment.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    CartComponent,
    SearchAdComponent,
    CreatePostComponent,
    ViewPostComponent,
    ClickedPostComponent,
    CommentComponent,
    
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgZorroImportsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatMenuModule
  ]
})
export class CustomerModule { }
