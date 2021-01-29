import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CrafComponentsPage, CrafDeleteDialog, CrafUpdatePage } from './craf.page-object';

const expect = chai.expect;

describe('Craf e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let crafComponentsPage: CrafComponentsPage;
  let crafUpdatePage: CrafUpdatePage;
  let crafDeleteDialog: CrafDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Crafs', async () => {
    await navBarPage.goToEntity('craf');
    crafComponentsPage = new CrafComponentsPage();
    await browser.wait(ec.visibilityOf(crafComponentsPage.title), 5000);
    expect(await crafComponentsPage.getTitle()).to.eq('ssinApp.craf.home.title');
    await browser.wait(ec.or(ec.visibilityOf(crafComponentsPage.entities), ec.visibilityOf(crafComponentsPage.noResult)), 1000);
  });

  it('should load create Craf page', async () => {
    await crafComponentsPage.clickOnCreateButton();
    crafUpdatePage = new CrafUpdatePage();
    expect(await crafUpdatePage.getPageTitle()).to.eq('ssinApp.craf.home.createOrEditLabel');
    await crafUpdatePage.cancel();
  });

  it('should create and save Crafs', async () => {
    const nbButtonsBeforeCreate = await crafComponentsPage.countDeleteButtons();

    await crafComponentsPage.clickOnCreateButton();

    await promise.all([
      crafUpdatePage.setNumeroInput('numero'),
      crafUpdatePage.setDataEmissaoInput('2000-12-31'),
      crafUpdatePage.setDataValidadeInput('2000-12-31'),
      crafUpdatePage.armaSelectLastOption(),
    ]);

    expect(await crafUpdatePage.getNumeroInput()).to.eq('numero', 'Expected Numero value to be equals to numero');
    expect(await crafUpdatePage.getDataEmissaoInput()).to.eq('2000-12-31', 'Expected dataEmissao value to be equals to 2000-12-31');
    expect(await crafUpdatePage.getDataValidadeInput()).to.eq('2000-12-31', 'Expected dataValidade value to be equals to 2000-12-31');

    await crafUpdatePage.save();
    expect(await crafUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await crafComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Craf', async () => {
    const nbButtonsBeforeDelete = await crafComponentsPage.countDeleteButtons();
    await crafComponentsPage.clickOnLastDeleteButton();

    crafDeleteDialog = new CrafDeleteDialog();
    expect(await crafDeleteDialog.getDialogTitle()).to.eq('ssinApp.craf.delete.question');
    await crafDeleteDialog.clickOnConfirmButton();

    expect(await crafComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
