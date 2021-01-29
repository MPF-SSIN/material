import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { CrafUpdateComponent } from 'app/entities/craf/craf-update.component';
import { CrafService } from 'app/entities/craf/craf.service';
import { Craf } from 'app/shared/model/craf.model';

describe('Component Tests', () => {
  describe('Craf Management Update Component', () => {
    let comp: CrafUpdateComponent;
    let fixture: ComponentFixture<CrafUpdateComponent>;
    let service: CrafService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [CrafUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CrafUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CrafUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CrafService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Craf(123);
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
        const entity = new Craf();
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
