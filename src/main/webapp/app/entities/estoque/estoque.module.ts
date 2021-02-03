import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SsinSharedModule } from 'app/shared/shared.module';
import { EstoqueComponent } from './estoque.component';
import { EstoqueDetailComponent } from './estoque-detail.component';
import { EstoqueUpdateComponent } from './estoque-update.component';
import { EstoqueDeleteDialogComponent } from './estoque-delete-dialog.component';
import { estoqueRoute } from './estoque.route';

@NgModule({
  imports: [SsinSharedModule, RouterModule.forChild(estoqueRoute)],
  declarations: [EstoqueComponent, EstoqueDetailComponent, EstoqueUpdateComponent, EstoqueDeleteDialogComponent],
  entryComponents: [EstoqueDeleteDialogComponent],
})
export class SsinEstoqueModule {}
