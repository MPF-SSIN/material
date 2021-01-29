import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICalibre } from 'app/shared/model/calibre.model';
import { CalibreService } from './calibre.service';

@Component({
  templateUrl: './calibre-delete-dialog.component.html',
})
export class CalibreDeleteDialogComponent {
  calibre?: ICalibre;

  constructor(protected calibreService: CalibreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.calibreService.delete(id).subscribe(() => {
      this.eventManager.broadcast('calibreListModification');
      this.activeModal.close();
    });
  }
}
