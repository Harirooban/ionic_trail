import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuickaccessPage } from './quickaccess.page';
import { CustomerFilterPipe } from '../customer-filter.pipe';

import { PipesModule } from '../pipes.module';

const routes: Routes = [
  {
    path: '',
    component: QuickaccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [QuickaccessPage]
})
export class QuickaccessPageModule {}
