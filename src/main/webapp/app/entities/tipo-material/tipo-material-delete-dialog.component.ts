import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoMaterial } from 'app/shared/model/tipo-material.model';
import { TipoMaterialService } from './tipo-material.service';

@Component({
  templateUrl: './tipo-material-delete-dialog.component.html',
})
export class TipoMaterialDeleteDialogComponent {
  tipoMaterial?: ITipoMaterial;

  constructor(
    protected tipoMaterialService: TipoMaterialService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoMaterialService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoMaterialListModification');
      this.activeModal.close();
    });
  }
}
