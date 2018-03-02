import { NgModule } from '@angular/core';

import { ThemeModule } from '../@theme/theme.module';
import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [ThemeModule, SearchRoutingModule,ReactiveFormsModule,FormsModule],
  declarations: [SearchComponent],
  providers: []
})
export class SearchModule {}
