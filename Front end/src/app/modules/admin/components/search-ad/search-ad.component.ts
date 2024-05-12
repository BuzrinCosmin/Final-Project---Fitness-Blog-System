import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-search-ad',
  templateUrl: './search-ad.component.html',
  styleUrls: ['./search-ad.component.scss']
})
export class SearchAdComponent {

  searchForm!: FormGroup;
  listOfType = ["Cardiovascular Workout", "Strength Training", "Flexibility and balance", "High-Intensity",
   "Group Fitness", "Circuit Training", "Bodyweight", "Functional", "Suspension", "AQUATIC Exercise"];
   isSpinning = false;
   ads: any = [];

  constructor(private fb: FormBuilder,
    private service: AdminService){
    this.searchForm=this.fb.group({
      name:[null],
      type:[null],
    })
  }

  search(){
    this.isSpinning=true;
    this.service.searchAd(this.searchForm.value).subscribe((res)=>{
      res.adDtoList.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.ads.push(element);
      });
      this.isSpinning=false;
    })
  }

}
