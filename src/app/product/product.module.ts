import {  NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {AddEditProductComponent} from './add-edit-product/add-edit-product.component';
import {ListProductComponent} from './list-product/list-product.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ProductService} from './shared/product.service';
import {DataResolve} from '../@shared/services/data.resolve';
import {ProductRoute} from './product.route';
import {DndDirective} from '../@shared/directives/dnd.directive';

@NgModule({
  imports: [
    HttpModule,
    ProductRoute,
    FormsModule,
    CommonModule
  ],
  declarations: [
    AddEditProductComponent,
    ListProductComponent,
    DndDirective
  ],
  providers:[ProductService, DataResolve]
})
export class ProductModule {}
