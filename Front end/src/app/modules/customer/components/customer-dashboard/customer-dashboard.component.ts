import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {

  ads: any = [];

  constructor(private service: CustomerService) {}

  ngOnInit() {
    this.getAllAds();

  }

  getAllAds() {
    this.service.getAllAds().subscribe((res)=>{
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.ads.push(element);
      });
    })
  }

}
