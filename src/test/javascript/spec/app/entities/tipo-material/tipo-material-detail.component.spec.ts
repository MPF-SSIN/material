import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { TipoMaterialDetailComponent } from 'app/entities/tipo-material/tipo-material-detail.component';
import { TipoMaterial } from 'app/shared/model/tipo-material.model';

describe('Component Tests', () => {
  describe('TipoMaterial Management Detail Component', () => {
    let comp: TipoMaterialDetailComponent;
    let fixture: ComponentFixture<TipoMaterialDetailComponent>;
    const route = ({ data: of({ tipoMaterial: new TipoMaterial(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [TipoMaterialDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TipoMaterialDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoMaterialDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoMaterial on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoMaterial).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
