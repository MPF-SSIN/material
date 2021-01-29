import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SsinSharedModule } from 'app/shared/shared.module';
import { ItemAcautelamentoComponent } from './item-acautelamento.component';
import { ItemAcautelamentoDetailComponent } from './item-acautelamento-detail.component';
import { ItemAcautelamentoUpdateComponent } from './item-acautelamento-update.component';
import { ItemAcautelamentoDeleteDialogComponent } from './item-acautelamento-delete-dialog.component';
import { itemAcautelamentoRoute } from './item-acautelamento.route';

@NgModule({
  imports: [SsinSharedModule, RouterModule.forChild(itemAcautelamentoRoute)],
  declarations: [
    ItemAcautelamentoComponent,
    ItemAcautelamentoDetailComponent,
    ItemAcautelamentoUpdateComponent,
    ItemAcautelamentoDeleteDialogComponent,
  ],
  entryComponents: [ItemAcautelamentoDeleteDialogComponent],
})
export class SsinItemAcautelamentoModule {}
