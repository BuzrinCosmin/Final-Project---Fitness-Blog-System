import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchAdComponent } from './components/search-ad/search-ad.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { ClickedPostComponent } from './clicked-post/clicked-post.component';





const routes: Routes = [
  {path: "dashboard", component: CustomerDashboardComponent},
  {path: "cart/:id", component: CartComponent},
  {path: 'search', component: SearchAdComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'fy', component: ViewPostComponent},
  {path: "view-post/:id", component: ClickedPostComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
