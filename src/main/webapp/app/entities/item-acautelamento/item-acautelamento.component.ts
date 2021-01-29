import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IItemAcautelamento } from 'app/shared/model/item-acautelamento.model';
import { ItemAcautelamentoService } from './item-acautelamento.service';
import { ItemAcautelamentoDeleteDialogComponent } from './item-acautelamento-delete-dialog.component';

@Component({
  selector: 'jhi-item-acautelamento',
  templateUrl: './item-acautelamento.component.html',
})
export class ItemAcautelamentoComponent implements OnInit, OnDestroy {
  itemAcautelamentos?: IItemAcautelamento[];
  eventSubscriber?: Subscription;

  constructor(
    protected itemAcautelamentoService: ItemAcautelamentoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.itemAcautelamentoService
      .query()
      .subscribe((res: HttpResponse<IItemAcautelamento[]>) => (this.itemAcautelamentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInItemAcautelamentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IItemAcautelamento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInItemAcautelamentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('itemAcautelamentoListModification', () => this.loadAll());
  }

  delete(itemAcautelamento: IItemAcautelamento): void {
    const modalRef = this.modalService.open(ItemAcautelamentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.itemAcautelamento = itemAcautelamento;
  }
}
