import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { TipoArmaUpdateComponent } from 'app/entities/tipo-arma/tipo-arma-update.component';
import { TipoArmaService } from 'app/entities/tipo-arma/tipo-arma.service';
import { TipoArma } from 'app/shared/model/tipo-arma.model';

describe('Component Tests', () => {
  describe('TipoArma Management Update Component', () => {
    let comp: TipoArmaUpdateComponent;
    let fixture: ComponentFixture<TipoArmaUpdateComponent>;
    let service: TipoArmaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [TipoArmaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TipoArmaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoArmaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoArmaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoArma(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoArma();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
