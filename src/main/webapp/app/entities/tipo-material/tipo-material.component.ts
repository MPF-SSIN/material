import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoMaterial } from 'app/shared/model/tipo-material.model';
import { TipoMaterialService } from './tipo-material.service';
import { TipoMaterialDeleteDialogComponent } from './tipo-material-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-material',
  templateUrl: './tipo-material.component.html',
})
export class TipoMaterialComponent implements OnInit, OnDestroy {
  tipoMaterials?: ITipoMaterial[];
  eventSubscriber?: Subscription;

  constructor(
    protected tipoMaterialService: TipoMaterialService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.tipoMaterialService.query().subscribe((res: HttpResponse<ITipoMaterial[]>) => (this.tipoMaterials = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoMaterials();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoMaterial): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoMaterials(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoMaterialListModification', () => this.loadAll());
  }

  delete(tipoMaterial: ITipoMaterial): void {
    const modalRef = this.modalService.open(TipoMaterialDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoMaterial = tipoMaterial;
  }
}
