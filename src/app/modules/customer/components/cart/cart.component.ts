import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  adId: number = this.activatedRoute.snapshot.params["id"];
  ad:any;
  processedImage: any;
  validateForm!: FormGroup;
  isSpinning = false;
  dateFormat:"DD-MM-YYYY";
  adData:any;
  review:any;


  reviewForm!: FormGroup;

  constructor(private service: CustomerService,
private activatedRoute:ActivatedRoute,
private fb: FormBuilder,
private message: NzMessageService,
private router: Router,
private matSnackBar: MatSnackBar){}

  ngOnInit() {
    this.validateForm = this.fb.group({})
    this.getAdById();

    console.log(this.adId);

      this.reviewForm = this.fb.group({
        
        postedBy: [null, Validators.required],
        content: [null, Validators.required],
        stars: [null, Validators.required]
      })

  }

  getAdById(){
    this.service.getAdById(this.adId).subscribe((res)=> {
      this.adData=res;
      console.log(res);
      this.getReviewByAdId();
      this.processedImage = 'data:image/jpeg;base64,' + res.returnedImage;
      this.ad=res;
    })
  }


  buyAd(data: any){
    console.log(data);
    this.isSpinning=true;
    let cartDto = {
      userId: StorageService.getUserId(),
      adId: this.adId
    }
    this.service.buyAd(cartDto).subscribe((res)=>{
      console.log(res);
      this.message.success("Buying request submitted succesfully", {nzDuration:5000});
      this.router.navigateByUrl("/customer/dashboard");
    }, error =>{
      this.message.error("Something went wrong", {nzDuration: 5000});
      

    });
    

  }

  createReview(){
    const postedBy=this.reviewForm.get('postedBy')?.value;
    const content= this.reviewForm.get('content')?.value;
    const stars= this.reviewForm.get('stars')?.value;
    

    this.service.createReview(this.adId,postedBy,content,stars).subscribe(res=>{
      this.matSnackBar.open("Review published succesfully", "Ok");
      this.getReviewByAdId();
    },error=>{
      this.matSnackBar.open("Something went wrong", "Ok")
    })
  }
  
  getReviewByAdId(){
    this.service.getReviewByAdId(this.adId).subscribe(res=>{
      this.review=res;
    },error=>{
      this.matSnackBar.open("Something went wrong", "Ok")
    })
  }
}
