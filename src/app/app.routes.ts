import { Routes , RouterModule} from '@angular/router';
import { LoginComponent } from './pages/admin/login/login.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { ProductsComponent } from './pages/admin/products/products.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { LandingPageComponent } from './pages/website/landing-page/landing-page.component';
import { CategproductsComponent } from './pages/website/categproducts/categproducts.component';
import { ProductshowComponent } from './pages/website/productshow/productshow.component';
import { ChekoutComponent } from './pages/website/chekout/chekout.component';
import { ContactUsComponent } from './pages/website/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/website/about-us/about-us.component';
import { CartComponent } from './pages/admin/cart/cart.component';


export const routes: Routes = [
    //redirect empty/defult beganing route to login
    {
        path:'',
         redirectTo:'shop',//first page by defult
         pathMatch:'full' //It determines whether the router should match the full URL or just the beginning of the URL 
        },
        {
            path:'login',
            component:LoginComponent
        },
        {
            path:'cat',
            component:CategoriesComponent
        },
        //layout is parent of other admin pages
        // Base path for admin routes
        {
            path:'',
            component:LayoutComponent,
            children:[
                {path:'products',
                    component:ProductsComponent
                }
            ]
        },
       
        {//base bath for user
            path:'',
            component:LandingPageComponent,
            children:[
                {path:'shop',//defult
                    component:ProductshowComponent
                },
                //to navigate to spesfic category  through spesfic id

                {path:'catproducts/:id',
                    component:CategproductsComponent
                },
                {path:'check',
                    component:ChekoutComponent
                },
                {path:'contact',
                    component:ContactUsComponent
                },
                {path:'about',
                    component:AboutUsComponent
                },
                {
                    path:'cart',
                    component:CartComponent
                },
                {
                    path:'checkout',
                    component:ChekoutComponent
                }
            ]
        }, 

];
