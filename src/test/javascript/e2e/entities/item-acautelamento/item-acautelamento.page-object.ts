import { element, by, ElementFinder } from 'protractor';

export class ItemAcautelamentoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-item-acautelamento div table .btn-danger'));
  title = element.all(by.css('jhi-item-acautelamento div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ItemAcautelamentoUpdatePage {
  pageTitle = element(by.id('jhi-item-acautelamento-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  quantidadeInput = element(by.id('field_quantidade'));
  valorUnitarioInput = element(by.id('field_valorUnitario'));

  itemSelect = element(by.id('field_item'));
  acautelamentoSelect = element(by.id('field_acautelamento'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setQuantidadeInput(quantidade: string): Promise<void> {
    await this.quantidadeInput.sendKeys(quantidade);
  }

  async getQuantidadeInput(): Promise<string> {
    return await this.quantidadeInput.getAttribute('value');
  }

  async setValorUnitarioInput(valorUnitario: string): Promise<void> {
    await this.valorUnitarioInput.sendKeys(valorUnitario);
  }

  async getValorUnitarioInput(): Promise<string> {
    return await this.valorUnitarioInput.getAttribute('value');
  }

  async itemSelectLastOption(): Promise<void> {
    await this.itemSelect.all(by.tagName('option')).last().click();
  }

  async itemSelectOption(option: string): Promise<void> {
    await this.itemSelect.sendKeys(option);
  }

  getItemSelect(): ElementFinder {
    return this.itemSelect;
  }

  async getItemSelectedOption(): Promise<string> {
    return await this.itemSelect.element(by.css('option:checked')).getText();
  }

  async acautelamentoSelectLastOption(): Promise<void> {
    await this.acautelamentoSelect.all(by.tagName('option')).last().click();
  }

  async acautelamentoSelectOption(option: string): Promise<void> {
    await this.acautelamentoSelect.sendKeys(option);
  }

  getAcautelamentoSelect(): ElementFinder {
    return this.acautelamentoSelect;
  }

  async getAcautelamentoSelectedOption(): Promise<string> {
    return await this.acautelamentoSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ItemAcautelamentoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-itemAcautelamento-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-itemAcautelamento'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
