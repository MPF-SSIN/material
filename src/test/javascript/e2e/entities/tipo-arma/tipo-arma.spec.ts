import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TipoArmaComponentsPage, TipoArmaDeleteDialog, TipoArmaUpdatePage } from './tipo-arma.page-object';

const expect = chai.expect;

describe('TipoArma e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoArmaComponentsPage: TipoArmaComponentsPage;
  let tipoArmaUpdatePage: TipoArmaUpdatePage;
  let tipoArmaDeleteDialog: TipoArmaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TipoArmas', async () => {
    await navBarPage.goToEntity('tipo-arma');
    tipoArmaComponentsPage = new TipoArmaComponentsPage();
    await browser.wait(ec.visibilityOf(tipoArmaComponentsPage.title), 5000);
    expect(await tipoArmaComponentsPage.getTitle()).to.eq('ssinApp.tipoArma.home.title');
    await browser.wait(ec.or(ec.visibilityOf(tipoArmaComponentsPage.entities), ec.visibilityOf(tipoArmaComponentsPage.noResult)), 1000);
  });

  it('should load create TipoArma page', async () => {
    await tipoArmaComponentsPage.clickOnCreateButton();
    tipoArmaUpdatePage = new TipoArmaUpdatePage();
    expect(await tipoArmaUpdatePage.getPageTitle()).to.eq('ssinApp.tipoArma.home.createOrEditLabel');
    await tipoArmaUpdatePage.cancel();
  });

  it('should create and save TipoArmas', async () => {
    const nbButtonsBeforeCreate = await tipoArmaComponentsPage.countDeleteButtons();

    await tipoArmaComponentsPage.clickOnCreateButton();

    await promise.all([tipoArmaUpdatePage.setNomeInput('nome')]);

    expect(await tipoArmaUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');

    await tipoArmaUpdatePage.save();
    expect(await tipoArmaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tipoArmaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TipoArma', async () => {
    const nbButtonsBeforeDelete = await tipoArmaComponentsPage.countDeleteButtons();
    await tipoArmaComponentsPage.clickOnLastDeleteButton();

    tipoArmaDeleteDialog = new TipoArmaDeleteDialog();
    expect(await tipoArmaDeleteDialog.getDialogTitle()).to.eq('ssinApp.tipoArma.delete.question');
    await tipoArmaDeleteDialog.clickOnConfirmButton();

    expect(await tipoArmaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
