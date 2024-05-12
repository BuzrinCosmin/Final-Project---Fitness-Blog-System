import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrls: ['./update-ad.component.scss']
})
export class UpdateAdComponent {
  isSpinning = false;
  adId: number=this.activatedRoute.snapshot.params["id"];
  imgChanged: boolean = false;
  selectedFile: any;
  imagePreview: string | ArrayBuffer | null;
  existingImage: string | null = null;
  updateForm: FormGroup;
  listOfType = ["Cardiovascular Workout", "Strength Training", "Flexibility and balance", "High-Intensity",
   "Group Fitness", "Circuit Training", "Bodyweight", "Functional", "Suspension", "AQUATIC Exercise"];
  
  constructor(private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
  private fb: FormBuilder,
private message: NzMessageService,
private router: Router) {}

    ngOnInit(){
      this.updateForm = this.fb.group({
        name: [null, Validators.required],
      content: [null, Validators.required],
      price: [null, Validators.required],
      type: [null, Validators.required],
      })
      this.getAdById();

    }

    getAdById(){
      this.isSpinning=true;
      this.adminService.getAdById(this.adId).subscribe((res) =>{
        this.isSpinning=false;
        const adDto=res;
        this.existingImage= 'data:image/jpeg;base64,' + res.returnedImage;
        console.log(adDto);
        this.updateForm.patchValue(adDto);
      })
    }

    updateAd(){
      this.isSpinning=true;
    const formData: FormData = new FormData();
    if(this.imgChanged && this.selectedFile) {
      formData.append('image', this.selectedFile!);
    }
    formData.append('name', this.updateForm.get('name')!.value);
    formData.append('type', this.updateForm.get('type')!.value);
    formData.append('content', this.updateForm.get('content')!.value);
    formData.append('price', this.updateForm.get('price')!.value);
    console.log(formData);
    this.adminService.updateAd(this.adId,formData).subscribe((res)=>{
      this.isSpinning=false;
      this.message.success("Ad updated successfully!", {nzDuration: 5000});
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    },error=>{
      this.message.error("Error while updating ad", {nzDuration: 5000})
    })
  }
    

    onFileSelected (event:any){
      this.selectedFile= event.target.files[0];
      this.imgChanged = true;
      this.existingImage = null;
      this.previewImage();
    }

    previewImage() {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(this.selectedFile);
    }

}
