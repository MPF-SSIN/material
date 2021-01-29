import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICraf, Craf } from 'app/shared/model/craf.model';
import { CrafService } from './craf.service';
import { IMaterial } from 'app/shared/model/material.model';
import { MaterialService } from 'app/entities/material/material.service';

@Component({
  selector: 'jhi-craf-update',
  templateUrl: './craf-update.component.html',
})
export class CrafUpdateComponent implements OnInit {
  isSaving = false;
  armas: IMaterial[] = [];
  dataEmissaoDp: any;
  dataValidadeDp: any;

  editForm = this.fb.group({
    id: [],
    numero: [null, [Validators.required]],
    dataEmissao: [null, [Validators.required]],
    dataValidade: [null, [Validators.required]],
    arma: [],
  });

  constructor(
    protected crafService: CrafService,
    protected materialService: MaterialService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ craf }) => {
      this.updateForm(craf);

      this.materialService
        .query({ filter: 'craf-is-null' })
        .pipe(
          map((res: HttpResponse<IMaterial[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IMaterial[]) => {
          if (!craf.arma || !craf.arma.id) {
            this.armas = resBody;
          } else {
            this.materialService
              .find(craf.arma.id)
              .pipe(
                map((subRes: HttpResponse<IMaterial>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IMaterial[]) => (this.armas = concatRes));
          }
        });
    });
  }

  updateForm(craf: ICraf): void {
    this.editForm.patchValue({
      id: craf.id,
      numero: craf.numero,
      dataEmissao: craf.dataEmissao,
      dataValidade: craf.dataValidade,
      arma: craf.arma,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const craf = this.createFromForm();
    if (craf.id !== undefined) {
      this.subscribeToSaveResponse(this.crafService.update(craf));
    } else {
      this.subscribeToSaveResponse(this.crafService.create(craf));
    }
  }

  private createFromForm(): ICraf {
    return {
      ...new Craf(),
      id: this.editForm.get(['id'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      dataEmissao: this.editForm.get(['dataEmissao'])!.value,
      dataValidade: this.editForm.get(['dataValidade'])!.value,
      arma: this.editForm.get(['arma'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICraf>>): void {
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
