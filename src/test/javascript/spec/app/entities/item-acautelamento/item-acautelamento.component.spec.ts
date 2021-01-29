import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SsinTestModule } from '../../../test.module';
import { ItemAcautelamentoComponent } from 'app/entities/item-acautelamento/item-acautelamento.component';
import { ItemAcautelamentoService } from 'app/entities/item-acautelamento/item-acautelamento.service';
import { ItemAcautelamento } from 'app/shared/model/item-acautelamento.model';

describe('Component Tests', () => {
  describe('ItemAcautelamento Management Component', () => {
    let comp: ItemAcautelamentoComponent;
    let fixture: ComponentFixture<ItemAcautelamentoComponent>;
    let service: ItemAcautelamentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [ItemAcautelamentoComponent],
      })
        .overrideTemplate(ItemAcautelamentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemAcautelamentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemAcautelamentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ItemAcautelamento(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.itemAcautelamentos && comp.itemAcautelamentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
