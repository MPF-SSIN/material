import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SsinSharedModule } from 'app/shared/shared.module';
import { CalibreComponent } from './calibre.component';
import { CalibreDetailComponent } from './calibre-detail.component';
import { CalibreUpdateComponent } from './calibre-update.component';
import { CalibreDeleteDialogComponent } from './calibre-delete-dialog.component';
import { calibreRoute } from './calibre.route';

@NgModule({
  imports: [SsinSharedModule, RouterModule.forChild(calibreRoute)],
  declarations: [CalibreComponent, CalibreDetailComponent, CalibreUpdateComponent, CalibreDeleteDialogComponent],
  entryComponents: [CalibreDeleteDialogComponent],
})
export class SsinCalibreModule {}
