import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent {

  allPosts:any;

  constructor(private service: CustomerService,
    private snackBar: MatSnackBar){}

    ngOnInit(){
      this.getAllPosts();
    }

    getAllPosts(){
      this.service.getAllPosts().subscribe((res)=>{
        console.log(res);
        this.allPosts=res;

      }), error=>{
        this.snackBar.open("Something went wrong", "Ok")
      }
    }

}
