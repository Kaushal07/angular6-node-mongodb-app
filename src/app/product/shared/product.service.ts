import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as _ from 'lodash';
import {map} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {apiUrl} from '../../shared/constant';



@Injectable()
export class ProductService {
  http: any;
  apiurl:any;

  static get parameters() {
    return [Http];
  }

  constructor(private Http : HttpClient) {
    this.http = Http;
    this.apiurl= apiUrl;
  }

  getAllProducts() {
    let searchUrl = `${this.apiurl}/getProducts`;
    return this.http.get(searchUrl).pipe(map((response: any) => response.json()));
  }

  getProductById(id) {
    let searchUrl = `${this.apiurl}/singleProduct/${id}`;
    return this.http.get(searchUrl).pipe(map((response: any) => response.json()));
  }

  deleteProductById(id) {
    let searchUrl = `${this.apiurl}/singleProduct?productId=${id}`;
    return this.http.delete(searchUrl).pipe(map((response: any) => response.json()));
  }

  imageUpload(file){
    let searchUrl = `${this.apiurl}/imageUpload`;
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data; boundary=------WebKitFormBoundary'+ Math.random());
    headers.append('Accept','application/json');
    let options = new RequestOptions({
      headers: headers
    });
    let formData = new FormData();
    formData.append('file', file[0]);
    return this.http.post(searchUrl, formData).pipe(map((response: any) => response.json()));
  }

  moreImagesUpload(files){
    let searchUrl = `${this.apiurl}/moreImagesUpload`;
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data; boundary=------WebKitFormBoundary'+ Math.random());
    headers.append('Accept','application/json');
    let options = new RequestOptions({
      headers: headers
    });
    let formData = new FormData();
    for(let i =0; i < files.length; i++){
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    return this.http.post(searchUrl, formData).pipe(map((response: any) => response.json()));
  }

  addProduct(productData) {
    let searchUrl = `${this.apiurl}/addProduct`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({
      headers: headers
    });

    return this.http.post(searchUrl, productData,options).pipe(map((response: any) => response.json()));
    }

  updateProduct(productData) {
    let searchUrl = `${this.apiurl}/updateProduct`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({
      headers: headers
    });
    return this.http.put(searchUrl,productData,options).pipe(map((response: any) => response.json()));
  }
}
