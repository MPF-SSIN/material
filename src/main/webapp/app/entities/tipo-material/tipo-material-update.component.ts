import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoMaterial, TipoMaterial } from 'app/shared/model/tipo-material.model';
import { TipoMaterialService } from './tipo-material.service';

@Component({
  selector: 'jhi-tipo-material-update',
  templateUrl: './tipo-material-update.component.html',
})
export class TipoMaterialUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
  });

  constructor(protected tipoMaterialService: TipoMaterialService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoMaterial }) => {
      this.updateForm(tipoMaterial);
    });
  }

  updateForm(tipoMaterial: ITipoMaterial): void {
    this.editForm.patchValue({
      id: tipoMaterial.id,
      nome: tipoMaterial.nome,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoMaterial = this.createFromForm();
    if (tipoMaterial.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoMaterialService.update(tipoMaterial));
    } else {
      this.subscribeToSaveResponse(this.tipoMaterialService.create(tipoMaterial));
    }
  }

  private createFromForm(): ITipoMaterial {
    return {
      ...new TipoMaterial(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoMaterial>>): void {
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
}
