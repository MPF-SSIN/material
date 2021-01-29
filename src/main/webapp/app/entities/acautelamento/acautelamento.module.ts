import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SsinSharedModule } from 'app/shared/shared.module';
import { AcautelamentoComponent } from './acautelamento.component';
import { AcautelamentoDetailComponent } from './acautelamento-detail.component';
import { AcautelamentoUpdateComponent } from './acautelamento-update.component';
import { AcautelamentoDeleteDialogComponent } from './acautelamento-delete-dialog.component';
import { acautelamentoRoute } from './acautelamento.route';

@NgModule({
  imports: [SsinSharedModule, RouterModule.forChild(acautelamentoRoute)],
  declarations: [AcautelamentoComponent, AcautelamentoDetailComponent, AcautelamentoUpdateComponent, AcautelamentoDeleteDialogComponent],
  entryComponents: [AcautelamentoDeleteDialogComponent],
})
export class SsinAcautelamentoModule {}
