import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL=["http://localhost:8080"]; 

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,   
  ) { }

  getAllAds():Observable<any>{
    return this.http.get(BASIC_URL+"/api/customer/ads",{
      headers : this.createAuthorizationHeader()
    })
  }

  getAdById(adId: number):Observable<any>{
    return this.http.get(BASIC_URL+"/api/customer/ad/" + adId,{
      headers : this.createAuthorizationHeader()
    })
  }

  buyAd(cartDto: any):Observable<any>{
    return this.http.post(BASIC_URL+"/api/customer/ad/cart", cartDto, {
      headers: this.createAuthorizationHeader()
    })
  }


  searchAd(searchAdDto:any): Observable<any>{
    return this.http.post(BASIC_URL + "/api/customer/ad/search", searchAdDto,{
      headers : this.createAuthorizationHeader()
    });
  }

  createNewPost(data: any):Observable<any>{
    return this.http.post(BASIC_URL+"/api/customer/post", data, {
      headers: this.createAuthorizationHeader()
    })
  }

  getAllPosts():Observable<any>{
    return this.http.get(BASIC_URL+"/api/customer/posts" , {
      headers: this.createAuthorizationHeader()
    })
  }

  getPostById(postId:number):Observable<any>{
    return this.http.get(BASIC_URL+'/api/customer/posts/' + postId , {
      headers: this.createAuthorizationHeader()
    })
  }

    likePost(postId:number):Observable<any>{
      return this.http.put(BASIC_URL+'/api/customer/posts/like/' + postId ,{}, {
        headers: this.createAuthorizationHeader()
      })
  }

  createComment(postId:number, postedBy: string, content:string):Observable<any>{
    const params={
      postId: postId,
      postedBy: postedBy
      
    }
    return this.http.post(BASIC_URL+"/api/customer/comment", content, {params,
      headers: this.createAuthorizationHeader()
    })
  }

  getCommentsByPostId(postId:number):Observable<any>{
    return this.http.get(BASIC_URL+'/api/customer/comment/' + postId , {
      headers: this.createAuthorizationHeader()
    })
  }

  createReview(adId:number, postedBy: string, stars: string, content: string):Observable<any>{
    const params={
      adId: adId,
      postedBy: postedBy,
      stars: stars
      
    }
    return this.http.post(BASIC_URL+"/api/customer/review", content, {params,
      headers: this.createAuthorizationHeader()
    })
  }

  getReviewByAdId(adId:number):Observable<any>{
    return this.http.get(BASIC_URL+'/api/customer/review/' + adId , {
      headers: this.createAuthorizationHeader()
    })
  }

 
 





  createAuthorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }

}
