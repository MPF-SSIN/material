import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AcautelamentoComponentsPage, AcautelamentoDeleteDialog, AcautelamentoUpdatePage } from './acautelamento.page-object';

const expect = chai.expect;

describe('Acautelamento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let acautelamentoComponentsPage: AcautelamentoComponentsPage;
  let acautelamentoUpdatePage: AcautelamentoUpdatePage;
  let acautelamentoDeleteDialog: AcautelamentoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Acautelamentos', async () => {
    await navBarPage.goToEntity('acautelamento');
    acautelamentoComponentsPage = new AcautelamentoComponentsPage();
    await browser.wait(ec.visibilityOf(acautelamentoComponentsPage.title), 5000);
    expect(await acautelamentoComponentsPage.getTitle()).to.eq('ssinApp.acautelamento.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(acautelamentoComponentsPage.entities), ec.visibilityOf(acautelamentoComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Acautelamento page', async () => {
    await acautelamentoComponentsPage.clickOnCreateButton();
    acautelamentoUpdatePage = new AcautelamentoUpdatePage();
    expect(await acautelamentoUpdatePage.getPageTitle()).to.eq('ssinApp.acautelamento.home.createOrEditLabel');
    await acautelamentoUpdatePage.cancel();
  });

  it('should create and save Acautelamentos', async () => {
    const nbButtonsBeforeCreate = await acautelamentoComponentsPage.countDeleteButtons();

    await acautelamentoComponentsPage.clickOnCreateButton();

    await promise.all([
      acautelamentoUpdatePage.setNumeroInput('numero'),
      acautelamentoUpdatePage.setDataHoraInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      acautelamentoUpdatePage.setDataHoraDevolucaoInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      acautelamentoUpdatePage.setObsInput('obs'),
      acautelamentoUpdatePage.acautelanteSelectLastOption(),
    ]);

    expect(await acautelamentoUpdatePage.getNumeroInput()).to.eq('numero', 'Expected Numero value to be equals to numero');
    expect(await acautelamentoUpdatePage.getDataHoraInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dataHora value to be equals to 2000-12-31'
    );
    expect(await acautelamentoUpdatePage.getDataHoraDevolucaoInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dataHoraDevolucao value to be equals to 2000-12-31'
    );
    expect(await acautelamentoUpdatePage.getObsInput()).to.eq('obs', 'Expected Obs value to be equals to obs');

    await acautelamentoUpdatePage.save();
    expect(await acautelamentoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await acautelamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Acautelamento', async () => {
    const nbButtonsBeforeDelete = await acautelamentoComponentsPage.countDeleteButtons();
    await acautelamentoComponentsPage.clickOnLastDeleteButton();

    acautelamentoDeleteDialog = new AcautelamentoDeleteDialog();
    expect(await acautelamentoDeleteDialog.getDialogTitle()).to.eq('ssinApp.acautelamento.delete.question');
    await acautelamentoDeleteDialog.clickOnConfirmButton();

    expect(await acautelamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
