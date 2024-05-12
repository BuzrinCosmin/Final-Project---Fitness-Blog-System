import { Component } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clicked-post',
  templateUrl: './clicked-post.component.html',
  styleUrls: ['./clicked-post.component.scss']
})
export class ClickedPostComponent {

  postId = this.activatedRoute.snapshot.params['id'];
  postData:any;
  comment:any;

  commentForm!: FormGroup;

  constructor(private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
  private fb: FormBuilder,){}

    ngOnInit(){
      console.log(this.postId);
      this.getPostById();

      this.commentForm = this.fb.group({
        postedBy: [null, Validators.required],
        content: [null, Validators.required],
        
      })
    }

    createComment(){
      const postedBy=this.commentForm.get('postedBy')?.value;
      const content= this.commentForm.get('content')?.value;
      
      this.service.createComment(this.postId,postedBy,content).subscribe(res=>{
        this.matSnackBar.open("Comment published succesfully", "Ok");
        this.getCommentByPostId();
      },error=>{
        this.matSnackBar.open("Something went wrong", "Ok")
      })
    }

    getPostById(){
      this.service.getPostById(this.postId).subscribe(res=>{
        this.postData = res;
        console.log(res);
        this.getCommentByPostId();
      },error=>{
        this.matSnackBar.open("Something went wrong", "Ok")
      })
    }

    likePost(){
      this.service.likePost(this.postId).subscribe((response)=>{
        this.matSnackBar.open("Post Liked Successfully", "Ok");
        this.getPostById();
      },(error)=>{
        this.matSnackBar.open("Something went wrong", "Ok")
      })

    }

    getCommentByPostId(){
      this.service.getCommentsByPostId(this.postId).subscribe(res=>{
        this.comment=res;
      },error=>{
        this.matSnackBar.open("Something went wrong", "Ok")
      })
    }

}
