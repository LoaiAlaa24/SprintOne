import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './store-menu';

import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';
//import {ProductsService} from "./products.service";
import {Products} from "./products.model";
//import {Http, Response} from "@angular/http";
//import {Observable} from "rxjs/Rx";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-store',

    template: `
        <ngx-main-layout>
            <nb-menu [items]="menu"></nb-menu>
            <router-outlet>
                
                <div *ngIf ="view">
                    <table>
                        <th width="100">Seller Name</th>
                    <th width="100">Name</th>
                    <th width="100">Price</th>
                    <th width="100">Created at</th>
                    <th width="100">Updated at</th>
                        <tr>
                            <td width="250">{{vroduct.sellerName}}</td>
                        <td width="250">{{vroduct.name}}</td>
                        <td width="250">{{vroduct.price}}</td>
                        <td width="250">{{vroduct.createdAt | date}}</td>
                        <td width="250">{{vroduct.updatedAt| date}}</td>
                        </tr>

                    </table>
                </div>
                
                
                
                <div *ngIf= "up" >
                  Update this Product you click on
                </div>
                <form [formGroup]="myForm"id="formNewProduct" #userForm="ngForm" (ngSubmit)="addProduct(userForm.value)">

                    <label for="name">Name of product:</label>
                    <input type="text" id="name" class="form-control"
                           formControlName="nameField" ngModel>
                    <div>
                        <label for="price">Price of product:</label>
                        <input type="text" id="price" class="form-control" formControlName="priceField" ngModel >
                    </div>

                    <button  [disabled]="!myForm.valid" class="btn btn-primary" type="submit">Save</button>
                </form>


                <div>
                    <h1>
                        Products
                    </h1>

                    <table>
                        <div>
                        <th width="100">Name</th>
                        <th width="100">Price</th>
                        <th width="100">Created at</th>
                        <th width="100">Updated at</th>
                        
                        </div>
                        <tr *ngFor="let rec of this.products">
                            <span *ngIf=" rec.sellerName == this.seller">
                            <td width="250">{{rec.name}}</td>
                            <td width="250">{{rec.price}}</td>
                            <td width="250">{{rec.createdAt | date}}</td>
                            <td width="250">{{rec.updatedAt| date}}</td>
                                <td> <span *ngIf="this.seller==rec.sellerName && (this.idu == M ||this.idu == A || this.idu == N ) " > <a  (click) = "viewProduct(rec._id)">View</a> </span> </td>
                                <td> <span *ngIf="this.seller==rec.sellerName && this.idu == A " > <a  (click) = "deleteProduct(rec._id)">DELETE</a> </span> </td>
                                  <td> <span *ngIf="this.seller==rec.sellerName && (this.idu == A ||this.idu == M) " > <a  (click) = "updateProduct(rec._id)">Update</a> </span> </td>
                                
                          
                            </span>
                        </tr>
                    </table>


                </div>

            </router-outlet>
        </ngx-main-layout>
    `,
    styleUrls: ['./styles.css']
})
export class StoreComponent implements OnInit {
    menu: NbMenuItem[];
    myForm: FormGroup;
   // products: Products[];
    productObj:object = {};

    constructor(private httpClient:HttpClient) {}
    products:any= [];
    pByMe:any=[];
    product:any=[];
    users:any=[];
    up:boolean;
    id:string;
    pid:number;


    idu:string;
    seller:String;
    view:boolean;
    vroduct:any;
    vuser:any;
    M:String="M";

    A:String="A";

    N:String="N";

    viewProduct(id:String){
         this.view = true;
        this.httpClient.get(environment.apiUrl + 'product/getProduct/'+id).subscribe((res )=> {
            this.vroduct=res['data'];

        });

    }

    updateProduct(id:string){

        localStorage.setItem("productID",id);
        localStorage.setItem("updating","true");

         window.location.reload();

    }


    deleteProduct(id:String){
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        this.httpClient.delete(environment.apiUrl +"/product/deleteProduct/"+id , config).subscribe(
            (data:any) => {
                console.log(data);}) ;

    window.location.reload();

    }




    //data:Object[];
    getProducts(){
      return this.httpClient.get(environment.apiUrl + 'product/getProducts');


    }
    getUsers(){

        return this.httpClient.get(environment.apiUrl + '/getUsers');


    }




  /*  addNewProduct = function(product) {
        this.productObj = {
            "name": product.name,
            "price": product.price
        }
        this.http.post("http://localhost:3000/products/", this.productObj).subscribe((res:Response) => {
            this.isAdded = true;
        })
    }*/


    addProduct(user){


        if(this.up){


            var data = JSON.stringify({name:user.nameField,price:user.priceField,sellerName:this.seller });
            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            };
            this.httpClient.patch(environment.apiUrl+'product/updateProduct/'+localStorage.getItem("productID"),data, config)
                .subscribe(
                    (data:any) => {
                        console.log(data);}) ;

            window.location.reload();


        }else{


        var data = JSON.stringify({name:user.nameField,price:user.priceField,sellerName:this.seller})
        var config = {
            headers : {
                'Content-Type': 'application/json'
            }
        }


        this.httpClient.post(environment.apiUrl+'/product/createProduct',data, config)
            .subscribe(
                (data:any) => {
                    console.log(data);}) ;

        window.location.reload();
    }}








    ngOnInit() {


        var obj = JSON.parse(localStorage.getItem("user"));
        this.seller = obj.username;
         console.log(this.seller);

        this.getProducts().subscribe(
            (res )=> {
                this.products=res['data'];
                console.log(this.products);
            });

this.getUsers().subscribe(

    (res )=> {
        this.users=res['data'];
       // console.log(this.users[0]._id);
        for(var u =0;u<this.users.length;u++){

            if(this.users[u].username == this.seller ){


                this.idu =this.users[u].level;
                console.log(this.idu);

            }
    }});







        if(localStorage.getItem("updating")=="true"){
            this.up = true;
            localStorage.setItem("updating","false");}
            else {
            this.up = false;
            localStorage.setItem("updating","false");
        }

        this.menu = MENU_ITEMS;
        this.myForm = new FormGroup({
            nameField: new FormControl(null, Validators.required),
            priceField: new FormControl(null, Validators.required)});

        this.getProducts();

    }



}