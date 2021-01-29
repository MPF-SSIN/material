import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { AcautelamentoUpdateComponent } from 'app/entities/acautelamento/acautelamento-update.component';
import { AcautelamentoService } from 'app/entities/acautelamento/acautelamento.service';
import { Acautelamento } from 'app/shared/model/acautelamento.model';

describe('Component Tests', () => {
  describe('Acautelamento Management Update Component', () => {
    let comp: AcautelamentoUpdateComponent;
    let fixture: ComponentFixture<AcautelamentoUpdateComponent>;
    let service: AcautelamentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [AcautelamentoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AcautelamentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AcautelamentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AcautelamentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Acautelamento(123);
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
        const entity = new Acautelamento();
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
