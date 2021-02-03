import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstoque } from 'app/shared/model/estoque.model';
import { EstoqueService } from './estoque.service';
import { EstoqueDeleteDialogComponent } from './estoque-delete-dialog.component';

@Component({
  selector: 'jhi-estoque',
  templateUrl: './estoque.component.html',
})
export class EstoqueComponent implements OnInit, OnDestroy {
  estoques?: IEstoque[];
  eventSubscriber?: Subscription;

  constructor(protected estoqueService: EstoqueService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.estoqueService.query().subscribe((res: HttpResponse<IEstoque[]>) => (this.estoques = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEstoques();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEstoque): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEstoques(): void {
    this.eventSubscriber = this.eventManager.subscribe('estoqueListModification', () => this.loadAll());
  }

  delete(estoque: IEstoque): void {
    const modalRef = this.modalService.open(EstoqueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estoque = estoque;
  }
}
