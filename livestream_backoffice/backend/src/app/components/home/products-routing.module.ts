import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './physical/category/category.component';
import { SubCategoryComponent } from './physical/sub-category/sub-category.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';

import { ProductDetailComponent } from './physical/product-detail/product-detail.component';
import { EventComponent } from './event/event.component';
import { LunchlivestreamComponent } from './lunchlivestream/lunchlivestream.component';
import { AbonnementComponent } from './abonnement/abonnement.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
   
    children: [
      {
        path: 'event',
        component: EventComponent,
        data: {
          title: "Event",
        }
      },
      {
        path: '',
        component: EventComponent,
        data: {
          title: "Event",
        }
      },
      {
        path: 'livestream',
        component: LunchlivestreamComponent,
        data: {
          title: "live stream",

        }
      },
      {
        path: 'abonnement',
        component: AbonnementComponent,

        data: {
          title: "Subscription",

        }
      },
      {
        path: 'physical/category',
        component: CategoryComponent,
        data: {
          title: "Category",
          breadcrumb: "Category",
        }
      },
      {
        path: 'physical/sub-category',
        component: SubCategoryComponent,
        data: {
          title: "Sub Category",
          breadcrumb: "Sub Category"
        }
      },
      {
        path: 'physical/product-list',
        component: ProductListComponent,
        data: {
          title: "Product List",
          breadcrumb: "Product List"
        }
      },
      {
        path: 'physical/product-detail',
        component: ProductDetailComponent,
        data: {
          title: "Product Detail",
          breadcrumb: "Product Detail"
        }
      },
      {
        path: 'physical/add-product',
        component: AddProductComponent,
        data: {
          title: "Add Products",
          breadcrumb: "Add Product"
        }
      },
    
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
