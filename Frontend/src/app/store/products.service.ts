import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

import { Products } from "./products.model";
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { HttpClientModule } from "@angular/common/http";
@Injectable()
export class ProductsService {
    private products: Products[] = [];
   // messageIsEdit = new EventEmitter<Products>();
    name:string="";
    price:number;
    constructor(private httpClient:HttpClient) {}

/*
    getProducts(){

    return this.httpClient.get(environment.apiUrl + 'product/getProducts');


    }*/
    addProduct(){
        this.httpClient.post(environment.apiUrl+'/product/createProduct',
            {
                name:'PS4',
                price: 400
            })
            .subscribe(
                (data:any) => {
                    console.log(data);}) ;} }






/*
    addProduct(products: Products) {
        const body = JSON.stringify(products);
        const headers = new  HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/#/store', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const prod = new Products('PS4', '99', '9/1/2018', '28/1/2018');
                this.products.push(prod);
                return prod;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
*/


                

/*
                getProducts() {
                    return this.http.get('http://localhost:3000/product/getProducts')
                        .map((response: Response) => {
                            const products = response.json().data;
                            let transformedProducts: Products[] = [];
                            for (let product of products) {
                                transformedProducts.push(new Products(product.name, product.price, product.createdAt, product.updatedAt));
                            }
                            this.products = transformedProducts;
                return transformedProducts;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }}
/*
    addProduct(){
        this.httpClient.post(`http://localhost:3000/product/createProduct',
            {
                name:'PS4',
                price: 400
            })
            .subscribe(
                (data:any) => {
                    console.log(data);}}}



}*/