import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { EstoqueDetailComponent } from 'app/entities/estoque/estoque-detail.component';
import { Estoque } from 'app/shared/model/estoque.model';

describe('Component Tests', () => {
  describe('Estoque Management Detail Component', () => {
    let comp: EstoqueDetailComponent;
    let fixture: ComponentFixture<EstoqueDetailComponent>;
    const route = ({ data: of({ estoque: new Estoque(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [EstoqueDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EstoqueDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstoqueDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estoque on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estoque).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
