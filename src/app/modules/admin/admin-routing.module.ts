import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { PostAdComponent } from 'src/app/pages/post-ad/post-ad.component';
import { UpdateAdComponent } from './components/update-ad/update-ad.component';
import { SearchAdComponent } from './components/search-ad/search-ad.component';

const routes: Routes = [
  {path: "dashboard", component: AdminDashbordComponent},
  {path: 'ad', component: PostAdComponent},
  {path: 'ad/:id', component: UpdateAdComponent},
  {path: 'search', component: SearchAdComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
