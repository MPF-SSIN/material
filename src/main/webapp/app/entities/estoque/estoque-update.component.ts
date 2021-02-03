import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEstoque, Estoque } from 'app/shared/model/estoque.model';
import { EstoqueService } from './estoque.service';
import { IMaterial } from 'app/shared/model/material.model';
import { MaterialService } from 'app/entities/material/material.service';

@Component({
  selector: 'jhi-estoque-update',
  templateUrl: './estoque-update.component.html',
})
export class EstoqueUpdateComponent implements OnInit {
  isSaving = false;
  materials: IMaterial[] = [];

  editForm = this.fb.group({
    id: [],
    quantidade: [null, [Validators.required]],
    localizacao: [null, [Validators.required]],
    material: [],
  });

  constructor(
    protected estoqueService: EstoqueService,
    protected materialService: MaterialService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estoque }) => {
      this.updateForm(estoque);

      this.materialService
        .query({ filter: 'estoque-is-null' })
        .pipe(
          map((res: HttpResponse<IMaterial[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IMaterial[]) => {
          if (!estoque.material || !estoque.material.id) {
            this.materials = resBody;
          } else {
            this.materialService
              .find(estoque.material.id)
              .pipe(
                map((subRes: HttpResponse<IMaterial>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IMaterial[]) => (this.materials = concatRes));
          }
        });
    });
  }

  updateForm(estoque: IEstoque): void {
    this.editForm.patchValue({
      id: estoque.id,
      quantidade: estoque.quantidade,
      localizacao: estoque.localizacao,
      material: estoque.material,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estoque = this.createFromForm();
    if (estoque.id !== undefined) {
      this.subscribeToSaveResponse(this.estoqueService.update(estoque));
    } else {
      this.subscribeToSaveResponse(this.estoqueService.create(estoque));
    }
  }

  private createFromForm(): IEstoque {
    return {
      ...new Estoque(),
      id: this.editForm.get(['id'])!.value,
      quantidade: this.editForm.get(['quantidade'])!.value,
      localizacao: this.editForm.get(['localizacao'])!.value,
      material: this.editForm.get(['material'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstoque>>): void {
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

  trackById(index: number, item: IMaterial): any {
    return item.id;
  }
}
