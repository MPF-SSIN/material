import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SsinSharedModule } from 'app/shared/shared.module';
import { TipoMaterialComponent } from './tipo-material.component';
import { TipoMaterialDetailComponent } from './tipo-material-detail.component';
import { TipoMaterialUpdateComponent } from './tipo-material-update.component';
import { TipoMaterialDeleteDialogComponent } from './tipo-material-delete-dialog.component';
import { tipoMaterialRoute } from './tipo-material.route';

@NgModule({
  imports: [SsinSharedModule, RouterModule.forChild(tipoMaterialRoute)],
  declarations: [TipoMaterialComponent, TipoMaterialDetailComponent, TipoMaterialUpdateComponent, TipoMaterialDeleteDialogComponent],
  entryComponents: [TipoMaterialDeleteDialogComponent],
})
export class SsinTipoMaterialModule {}
