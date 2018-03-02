import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

import { StoreRoutingModule } from './store-routing.module';

import { StoreComponent } from './store.component';


import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
    imports: [ThemeModule, StoreRoutingModule,FormsModule,HttpClientModule,ReactiveFormsModule ],
    declarations: [StoreComponent],
    entryComponents: [],
    providers: []
})
export class StoreModule {}
