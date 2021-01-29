import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SsinSharedModule } from 'app/shared/shared.module';
import { FornecedorComponent } from './fornecedor.component';
import { FornecedorDetailComponent } from './fornecedor-detail.component';
import { FornecedorUpdateComponent } from './fornecedor-update.component';
import { FornecedorDeleteDialogComponent } from './fornecedor-delete-dialog.component';
import { fornecedorRoute } from './fornecedor.route';

@NgModule({
  imports: [SsinSharedModule, RouterModule.forChild(fornecedorRoute)],
  declarations: [FornecedorComponent, FornecedorDetailComponent, FornecedorUpdateComponent, FornecedorDeleteDialogComponent],
  entryComponents: [FornecedorDeleteDialogComponent],
})
export class SsinFornecedorModule {}
