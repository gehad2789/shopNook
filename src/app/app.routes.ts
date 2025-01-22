import { Routes } from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';

export const routes: Routes = [
    //redirect empty/defult beganing route to login
    {
        path:'',
         redirectTo:'login',
         pathMatch:'full' //It determines whether the router should match the full URL or just the beginning of the URL 
        },
        {
            path:'login',
            component:LoginComponent
        },
        //layout is parent of other admin pages
        {
            path:'',
            component:LayoutComponent,
            children:[
                {path:'products',
                    component:ProductsComponent
                }
            ]
        }
];
