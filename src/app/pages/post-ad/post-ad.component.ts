import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from 'src/app/modules/admin/service/admin.service';

@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.scss']
})
export class PostAdComponent {
  postAdForm!: FormGroup
  isSpinning: boolean = false;
  selectedFile!: File | null;
  imagePreview!:string | ArrayBuffer | null;
  listOfType = ["Cardiovascular Workout", "Strength Training", "Flexibility and balance", "High-Intensity",
   "Group Fitness", "Circuit Training", "Bodyweight", "Functional", "Suspension", "AQUATIC Exercise", "Nutrition Plan"];

  constructor(private fb:FormBuilder,
    private adminService: AdminService,
  private message: NzMessageService,
private router: Router){ }


  ngOnInit() {
    this.postAdForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, Validators.required],
      price: [null, Validators.required],
      type: [null, Validators.required],
    })
  }

  postAd(){
    console.log(this.postAdForm.value);
    this.isSpinning=true;
    const formData: FormData = new FormData();
    formData.append('image', this.selectedFile!);
    formData.append('name', this.postAdForm.get('name')!.value);
    formData.append('type', this.postAdForm.get('type')!.value);
    formData.append('content', this.postAdForm.get('content')!.value);
    formData.append('price', this.postAdForm.get('price')!.value);
    console.log(formData);
    this.adminService.postAd(formData).subscribe((res)=>{
      this.isSpinning=false;
      this.message.success("Ad posted successfully!", {nzDuration: 5000});
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    },error=>{
      this.message.error("Error while posting ad", {nzDuration: 5000})
    })
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload =() => {
      this.imagePreview = reader.result;
    } 
    reader.readAsDataURL(this.selectedFile!);
  }

}
