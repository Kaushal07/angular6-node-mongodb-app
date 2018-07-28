import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'product',
    loadChildren: './product/product.module#ProductModule'
  },
	{
		path: '',
		pathMatch: "full",
		redirectTo: "product"
	}];

export const RouteModule = RouterModule.forRoot(routes);
