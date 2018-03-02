import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './search-menu';

import { NbMenuItem } from '@nebular/theme/components/menu/menu.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-search',
    template: `
    <ngx-main-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet>


          <div>

              <form  [formGroup]="myForm"id="formNewProduct" #userForm="ngForm" (ngSubmit)="searchProduct(userForm.value)">

                  <label for="search">Search:</label>
                  <input type="text" id="search" class="form-control"
                         formControlName="searchField" ngModel>
                  <button  [disabled]="!myForm.valid" class="btn btn-primary" type="submit">Search</button>
              </form>
              <table>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                  <th></th>
                  <th></th>
                  <tr *ngFor="let rec of this.foundProducts">
                      <td>{{rec.id}}</td>
                      <td>{{rec.name}}</td>
                      <td>{{rec.price}}</td>
                      <td>{{rec.createdAt | date}}</td>
                      <td>{{rec.updatedAt| date}}</td>

                  </tr>
              </table>


          </div>
        




      </router-outlet>
    </ngx-main-layout>
  `,
    styleUrls: ['./styles.css']
})
export class SearchComponent implements OnInit {
    menu: NbMenuItem[];
    products:any=[];
    products2:any=[];
    foundProducts:any=[];
    exist:Boolean;
    myForm: FormGroup;
    myForm2: FormGroup;
    product:any;
    id:Number;
    price:Number;
    count:number=0;
    constructor(private httpClient:HttpClient) {}



    searchProduct(user){

        for(var i = 0; i < this.products.length ; i++) {
            if(this.products[i].name === user.searchField ) {
                this.exist = true;
                this.product = this.products[i];
                console.log(this.product);
               this.foundProducts.push(this.product);
            }

            else{

                this.exist = false;

            }}



        }





    ngOnInit() {

        this.menu = MENU_ITEMS;
        this.myForm = new FormGroup({
            searchField: new FormControl(null, Validators.required)});


        this.httpClient.get(environment.apiUrl + 'product/getProducts').subscribe(
            (res )=> {
                this.products=res['data'];

                console.log(this.products);
            });



    }}