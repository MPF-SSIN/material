import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CalibreComponentsPage, CalibreDeleteDialog, CalibreUpdatePage } from './calibre.page-object';

const expect = chai.expect;

describe('Calibre e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let calibreComponentsPage: CalibreComponentsPage;
  let calibreUpdatePage: CalibreUpdatePage;
  let calibreDeleteDialog: CalibreDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Calibres', async () => {
    await navBarPage.goToEntity('calibre');
    calibreComponentsPage = new CalibreComponentsPage();
    await browser.wait(ec.visibilityOf(calibreComponentsPage.title), 5000);
    expect(await calibreComponentsPage.getTitle()).to.eq('ssinApp.calibre.home.title');
    await browser.wait(ec.or(ec.visibilityOf(calibreComponentsPage.entities), ec.visibilityOf(calibreComponentsPage.noResult)), 1000);
  });

  it('should load create Calibre page', async () => {
    await calibreComponentsPage.clickOnCreateButton();
    calibreUpdatePage = new CalibreUpdatePage();
    expect(await calibreUpdatePage.getPageTitle()).to.eq('ssinApp.calibre.home.createOrEditLabel');
    await calibreUpdatePage.cancel();
  });

  it('should create and save Calibres', async () => {
    const nbButtonsBeforeCreate = await calibreComponentsPage.countDeleteButtons();

    await calibreComponentsPage.clickOnCreateButton();

    await promise.all([calibreUpdatePage.setNomeInput('nome')]);

    expect(await calibreUpdatePage.getNomeInput()).to.eq('nome', 'Expected Nome value to be equals to nome');

    await calibreUpdatePage.save();
    expect(await calibreUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await calibreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Calibre', async () => {
    const nbButtonsBeforeDelete = await calibreComponentsPage.countDeleteButtons();
    await calibreComponentsPage.clickOnLastDeleteButton();

    calibreDeleteDialog = new CalibreDeleteDialog();
    expect(await calibreDeleteDialog.getDialogTitle()).to.eq('ssinApp.calibre.delete.question');
    await calibreDeleteDialog.clickOnConfirmButton();

    expect(await calibreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
