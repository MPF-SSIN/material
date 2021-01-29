import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoArma, TipoArma } from 'app/shared/model/tipo-arma.model';
import { TipoArmaService } from './tipo-arma.service';

@Component({
  selector: 'jhi-tipo-arma-update',
  templateUrl: './tipo-arma-update.component.html',
})
export class TipoArmaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
  });

  constructor(protected tipoArmaService: TipoArmaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoArma }) => {
      this.updateForm(tipoArma);
    });
  }

  updateForm(tipoArma: ITipoArma): void {
    this.editForm.patchValue({
      id: tipoArma.id,
      nome: tipoArma.nome,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoArma = this.createFromForm();
    if (tipoArma.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoArmaService.update(tipoArma));
    } else {
      this.subscribeToSaveResponse(this.tipoArmaService.create(tipoArma));
    }
  }

  private createFromForm(): ITipoArma {
    return {
      ...new TipoArma(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoArma>>): void {
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
