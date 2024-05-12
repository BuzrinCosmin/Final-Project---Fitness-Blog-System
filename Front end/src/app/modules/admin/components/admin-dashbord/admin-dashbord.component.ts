import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashbord',
  templateUrl: './admin-dashbord.component.html',
  styleUrls: ['./admin-dashbord.component.scss']
})
export class AdminDashbordComponent {

  ads: any = [];

  constructor(private adminService: AdminService,
    private message: NzMessageService){ }

    ngOnInit() {
      this.getAllAds();

    }

    getAllAds() {
      this.adminService.getAllAds().subscribe((res)=>{
        console.log(res);
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
          this.ads.push(element);
        });
      })
    }
    
  deleteAd(id: number){
    console.log(id);
    this.adminService.deleteAd(id).subscribe((res)=>{
      this.getAllAds();
      this.message.success("Ad deleted successfully", {nzDuration: 5000});

    })

  }

}
