import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IItemAcautelamento, ItemAcautelamento } from 'app/shared/model/item-acautelamento.model';
import { ItemAcautelamentoService } from './item-acautelamento.service';
import { IMaterial } from 'app/shared/model/material.model';
import { MaterialService } from 'app/entities/material/material.service';
import { IAcautelamento } from 'app/shared/model/acautelamento.model';
import { AcautelamentoService } from 'app/entities/acautelamento/acautelamento.service';

type SelectableEntity = IMaterial | IAcautelamento;

@Component({
  selector: 'jhi-item-acautelamento-update',
  templateUrl: './item-acautelamento-update.component.html',
})
export class ItemAcautelamentoUpdateComponent implements OnInit {
  isSaving = false;
  materials: IMaterial[] = [];
  acautelamentos: IAcautelamento[] = [];

  editForm = this.fb.group({
    id: [],
    quantidade: [null, [Validators.required]],
    valorUnitario: [null, [Validators.required]],
    material: [],
    acautelamento: [],
  });

  constructor(
    protected itemAcautelamentoService: ItemAcautelamentoService,
    protected materialService: MaterialService,
    protected acautelamentoService: AcautelamentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ itemAcautelamento }) => {
      this.updateForm(itemAcautelamento);

      this.materialService
        .query({ filter: 'itemacautelamento-is-null' })
        .pipe(
          map((res: HttpResponse<IMaterial[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IMaterial[]) => {
          if (!itemAcautelamento.material || !itemAcautelamento.material.id) {
            this.materials = resBody;
          } else {
            this.materialService
              .find(itemAcautelamento.material.id)
              .pipe(
                map((subRes: HttpResponse<IMaterial>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IMaterial[]) => (this.materials = concatRes));
          }
        });

      this.acautelamentoService.query().subscribe((res: HttpResponse<IAcautelamento[]>) => (this.acautelamentos = res.body || []));
    });
  }

  updateForm(itemAcautelamento: IItemAcautelamento): void {
    this.editForm.patchValue({
      id: itemAcautelamento.id,
      quantidade: itemAcautelamento.quantidade,
      valorUnitario: itemAcautelamento.valorUnitario,
      material: itemAcautelamento.material,
      acautelamento: itemAcautelamento.acautelamento,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const itemAcautelamento = this.createFromForm();
    if (itemAcautelamento.id !== undefined) {
      this.subscribeToSaveResponse(this.itemAcautelamentoService.update(itemAcautelamento));
    } else {
      this.subscribeToSaveResponse(this.itemAcautelamentoService.create(itemAcautelamento));
    }
  }

  private createFromForm(): IItemAcautelamento {
    return {
      ...new ItemAcautelamento(),
      id: this.editForm.get(['id'])!.value,
      quantidade: this.editForm.get(['quantidade'])!.value,
      valorUnitario: this.editForm.get(['valorUnitario'])!.value,
      material: this.editForm.get(['material'])!.value,
      acautelamento: this.editForm.get(['acautelamento'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemAcautelamento>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
