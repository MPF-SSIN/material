import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICraf } from 'app/shared/model/craf.model';
import { CrafService } from './craf.service';

@Component({
  templateUrl: './craf-delete-dialog.component.html',
})
export class CrafDeleteDialogComponent {
  craf?: ICraf;

  constructor(protected crafService: CrafService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crafService.delete(id).subscribe(() => {
      this.eventManager.broadcast('crafListModification');
      this.activeModal.close();
    });
  }
}
