import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { CrafService } from 'app/entities/craf/craf.service';
import { ICraf, Craf } from 'app/shared/model/craf.model';

describe('Service Tests', () => {
  describe('Craf Service', () => {
    let injector: TestBed;
    let service: CrafService;
    let httpMock: HttpTestingController;
    let elemDefault: ICraf;
    let expectedResult: ICraf | ICraf[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CrafService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Craf(0, 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataEmissao: currentDate.format(DATE_FORMAT),
            dataValidade: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Craf', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataEmissao: currentDate.format(DATE_FORMAT),
            dataValidade: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataEmissao: currentDate,
            dataValidade: currentDate,
          },
          returnedFromService
        );

        service.create(new Craf()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Craf', () => {
        const returnedFromService = Object.assign(
          {
            numero: 'BBBBBB',
            dataEmissao: currentDate.format(DATE_FORMAT),
            dataValidade: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataEmissao: currentDate,
            dataValidade: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Craf', () => {
        const returnedFromService = Object.assign(
          {
            numero: 'BBBBBB',
            dataEmissao: currentDate.format(DATE_FORMAT),
            dataValidade: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataEmissao: currentDate,
            dataValidade: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Craf', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
