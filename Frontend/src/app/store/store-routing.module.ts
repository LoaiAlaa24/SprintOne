import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreComponent } from './store.component';


const routes: Routes = [
    {
        path: '',
        component: StoreComponent,
        children: [


            {
                path: '/products',
                redirectTo: 'products',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class StoreRoutingModule {}