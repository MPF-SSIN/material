import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SsinSharedModule } from 'app/shared/shared.module';
import { MaterialComponent } from './material.component';
import { MaterialDetailComponent } from './material-detail.component';
import { MaterialUpdateComponent } from './material-update.component';
import { MaterialDeleteDialogComponent } from './material-delete-dialog.component';
import { materialRoute } from './material.route';

@NgModule({
  imports: [SsinSharedModule, RouterModule.forChild(materialRoute)],
  declarations: [MaterialComponent, MaterialDetailComponent, MaterialUpdateComponent, MaterialDeleteDialogComponent],
  entryComponents: [MaterialDeleteDialogComponent],
})
export class SsinMaterialModule {}
