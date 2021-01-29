import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SsinSharedModule } from 'app/shared/shared.module';
import { CrafComponent } from './craf.component';
import { CrafDetailComponent } from './craf-detail.component';
import { CrafUpdateComponent } from './craf-update.component';
import { CrafDeleteDialogComponent } from './craf-delete-dialog.component';
import { crafRoute } from './craf.route';

@NgModule({
  imports: [SsinSharedModule, RouterModule.forChild(crafRoute)],
  declarations: [CrafComponent, CrafDetailComponent, CrafUpdateComponent, CrafDeleteDialogComponent],
  entryComponents: [CrafDeleteDialogComponent],
})
export class SsinCrafModule {}
