import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SsinTestModule } from '../../../test.module';
import { CalibreDetailComponent } from 'app/entities/calibre/calibre-detail.component';
import { Calibre } from 'app/shared/model/calibre.model';

describe('Component Tests', () => {
  describe('Calibre Management Detail Component', () => {
    let comp: CalibreDetailComponent;
    let fixture: ComponentFixture<CalibreDetailComponent>;
    const route = ({ data: of({ calibre: new Calibre(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [CalibreDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CalibreDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CalibreDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load calibre on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.calibre).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
