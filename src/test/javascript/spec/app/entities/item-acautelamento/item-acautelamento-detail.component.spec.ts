import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { ItemAcautelamentoDetailComponent } from 'app/entities/item-acautelamento/item-acautelamento-detail.component';
import { ItemAcautelamento } from 'app/shared/model/item-acautelamento.model';

describe('Component Tests', () => {
  describe('ItemAcautelamento Management Detail Component', () => {
    let comp: ItemAcautelamentoDetailComponent;
    let fixture: ComponentFixture<ItemAcautelamentoDetailComponent>;
    const route = ({ data: of({ itemAcautelamento: new ItemAcautelamento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [ItemAcautelamentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ItemAcautelamentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemAcautelamentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load itemAcautelamento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.itemAcautelamento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
