import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SsinSharedModule } from 'app/shared/shared.module';
import { TipoArmaComponent } from './tipo-arma.component';
import { TipoArmaDetailComponent } from './tipo-arma-detail.component';
import { TipoArmaUpdateComponent } from './tipo-arma-update.component';
import { TipoArmaDeleteDialogComponent } from './tipo-arma-delete-dialog.component';
import { tipoArmaRoute } from './tipo-arma.route';

@NgModule({
  imports: [SsinSharedModule, RouterModule.forChild(tipoArmaRoute)],
  declarations: [TipoArmaComponent, TipoArmaDetailComponent, TipoArmaUpdateComponent, TipoArmaDeleteDialogComponent],
  entryComponents: [TipoArmaDeleteDialogComponent],
})
export class SsinTipoArmaModule {}
