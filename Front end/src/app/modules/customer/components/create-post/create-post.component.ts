import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  postForm!: FormGroup;
  tags:string[] = [];
  

  constructor(private fb: FormBuilder,
   private router: Router,
  private snackBar: MatSnackBar,
private service: CustomerService,){}


   ngOnInit(){
    this.postForm=this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
       img: [null, Validators.required],
      postedBy: [null,Validators.required]
      

    })
   }

add(event:any){
  const value = (event.value || '').trim();
  if(value){
    this.tags.push(value);
  }

  event.chipInput!.clear();
}

remove(tag:any){
  const index = this.tags.indexOf(tag);

  if(index>=0){
    this.tags.splice(index,1);
  }
}

createPost(){
  const data = this.postForm.value;
  data.tags = this.tags;

  this.service.createNewPost(data).subscribe((res)=>{
    this.snackBar.open("Post Created Succesfully!", "Ok");
    this.router.navigateByUrl("/");
  },error=>{
    this.snackBar.open("Something Went Wrong", "Ok")

  })
}





}
