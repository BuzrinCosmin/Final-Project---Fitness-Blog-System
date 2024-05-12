import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';


const BASIC_URL=["http://localhost:8080"]; 

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

    postAd(adDto:any): Observable<any>{
      return this.http.post(BASIC_URL + "/api/admin/ad", adDto,{
        headers : this.createAuthorizationHeader()
      });
    }

    getAllAds():Observable<any>{
      return this.http.get(BASIC_URL+"/api/admin/ads",{
        headers : this.createAuthorizationHeader()
      })
    }

    deleteAd(id:number):Observable<any>{
      return this.http.delete(BASIC_URL+"/api/admin/ad/" + id,{
        headers: this.createAuthorizationHeader()
      });
    }

    getAdById(id: number):Observable<any> {
      return this.http.get(BASIC_URL+"/api/admin/ad/" + id,{
        headers: this.createAuthorizationHeader()
      });
    }

    updateAd(adId: number, adDto: any):Observable<any>{
      return this.http.put(BASIC_URL+"/api/admin/ad/" + adId,adDto, {
        headers: this.createAuthorizationHeader()
      });
    }

    searchAd(searchAdDto:any): Observable<any>{
      return this.http.post(BASIC_URL + "/api/admin/ad/search", searchAdDto,{
        headers : this.createAuthorizationHeader()
      });
    }

    createAuthorizationHeader(): HttpHeaders{
      let authHeaders: HttpHeaders = new HttpHeaders();
      return authHeaders.set(
        'Authorization',
        'Bearer ' + StorageService.getToken()
      );
    }

}
