import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SsinTestModule } from '../../../test.module';
import { CalibreComponent } from 'app/entities/calibre/calibre.component';
import { CalibreService } from 'app/entities/calibre/calibre.service';
import { Calibre } from 'app/shared/model/calibre.model';

describe('Component Tests', () => {
  describe('Calibre Management Component', () => {
    let comp: CalibreComponent;
    let fixture: ComponentFixture<CalibreComponent>;
    let service: CalibreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SsinTestModule],
        declarations: [CalibreComponent],
      })
        .overrideTemplate(CalibreComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CalibreComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CalibreService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Calibre(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.calibres && comp.calibres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
