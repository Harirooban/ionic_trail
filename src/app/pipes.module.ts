import { NgModule } from '@angular/core';
import { CustomerFilterPipe } from './customer-filter.pipe';

@NgModule({
	declarations: [
		CustomerFilterPipe
	],
	exports: [
		CustomerFilterPipe
	]
})

export class PipesModule {}