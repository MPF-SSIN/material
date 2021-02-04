import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ItemAcautelamentoComponentsPage,
  ItemAcautelamentoDeleteDialog,
  ItemAcautelamentoUpdatePage,
} from './item-acautelamento.page-object';

const expect = chai.expect;

describe('ItemAcautelamento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let itemAcautelamentoComponentsPage: ItemAcautelamentoComponentsPage;
  let itemAcautelamentoUpdatePage: ItemAcautelamentoUpdatePage;
  let itemAcautelamentoDeleteDialog: ItemAcautelamentoDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ItemAcautelamentos', async () => {
    await navBarPage.goToEntity('item-acautelamento');
    itemAcautelamentoComponentsPage = new ItemAcautelamentoComponentsPage();
    await browser.wait(ec.visibilityOf(itemAcautelamentoComponentsPage.title), 5000);
    expect(await itemAcautelamentoComponentsPage.getTitle()).to.eq('ssinApp.itemAcautelamento.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(itemAcautelamentoComponentsPage.entities), ec.visibilityOf(itemAcautelamentoComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ItemAcautelamento page', async () => {
    await itemAcautelamentoComponentsPage.clickOnCreateButton();
    itemAcautelamentoUpdatePage = new ItemAcautelamentoUpdatePage();
    expect(await itemAcautelamentoUpdatePage.getPageTitle()).to.eq('ssinApp.itemAcautelamento.home.createOrEditLabel');
    await itemAcautelamentoUpdatePage.cancel();
  });

  it('should create and save ItemAcautelamentos', async () => {
    const nbButtonsBeforeCreate = await itemAcautelamentoComponentsPage.countDeleteButtons();

    await itemAcautelamentoComponentsPage.clickOnCreateButton();

    await promise.all([
      itemAcautelamentoUpdatePage.setQuantidadeInput('5'),
      itemAcautelamentoUpdatePage.setValorUnitarioInput('5'),
      itemAcautelamentoUpdatePage.materialSelectLastOption(),
      itemAcautelamentoUpdatePage.acautelamentoSelectLastOption(),
    ]);

    expect(await itemAcautelamentoUpdatePage.getQuantidadeInput()).to.eq('5', 'Expected quantidade value to be equals to 5');
    expect(await itemAcautelamentoUpdatePage.getValorUnitarioInput()).to.eq('5', 'Expected valorUnitario value to be equals to 5');

    await itemAcautelamentoUpdatePage.save();
    expect(await itemAcautelamentoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await itemAcautelamentoComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ItemAcautelamento', async () => {
    const nbButtonsBeforeDelete = await itemAcautelamentoComponentsPage.countDeleteButtons();
    await itemAcautelamentoComponentsPage.clickOnLastDeleteButton();

    itemAcautelamentoDeleteDialog = new ItemAcautelamentoDeleteDialog();
    expect(await itemAcautelamentoDeleteDialog.getDialogTitle()).to.eq('ssinApp.itemAcautelamento.delete.question');
    await itemAcautelamentoDeleteDialog.clickOnConfirmButton();

    expect(await itemAcautelamentoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
