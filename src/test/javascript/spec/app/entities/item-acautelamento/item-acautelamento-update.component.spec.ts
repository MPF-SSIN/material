import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { ItemAcautelamentoUpdateComponent } from 'app/entities/item-acautelamento/item-acautelamento-update.component';
import { ItemAcautelamentoService } from 'app/entities/item-acautelamento/item-acautelamento.service';
import { ItemAcautelamento } from 'app/shared/model/item-acautelamento.model';

describe('Component Tests', () => {
  describe('ItemAcautelamento Management Update Component', () => {
    let comp: ItemAcautelamentoUpdateComponent;
    let fixture: ComponentFixture<ItemAcautelamentoUpdateComponent>;
    let service: ItemAcautelamentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [ItemAcautelamentoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ItemAcautelamentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemAcautelamentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemAcautelamentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemAcautelamento(123);
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
        const entity = new ItemAcautelamento();
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
