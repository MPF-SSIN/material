import { element, by, ElementFinder } from 'protractor';

export class MaterialComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-material div table .btn-danger'));
  title = element.all(by.css('jhi-material div h2#page-heading span')).first();
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

export class MaterialUpdatePage {
  pageTitle = element(by.id('jhi-material-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomeInput = element(by.id('field_nome'));
  descricaoInput = element(by.id('field_descricao'));
  marcaInput = element(by.id('field_marca'));
  valorInput = element(by.id('field_valor'));
  situacaoSelect = element(by.id('field_situacao'));
  serieInput = element(by.id('field_serie'));
  loteInput = element(by.id('field_lote'));
  tamanhoInput = element(by.id('field_tamanho'));

  tipoMaterialSelect = element(by.id('field_tipoMaterial'));
  tipoArmaSelect = element(by.id('field_tipoArma'));
  calibreSelect = element(by.id('field_calibre'));
  fornecedorSelect = element(by.id('field_fornecedor'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomeInput(nome: string): Promise<void> {
    await this.nomeInput.sendKeys(nome);
  }

  async getNomeInput(): Promise<string> {
    return await this.nomeInput.getAttribute('value');
  }

  async setDescricaoInput(descricao: string): Promise<void> {
    await this.descricaoInput.sendKeys(descricao);
  }

  async getDescricaoInput(): Promise<string> {
    return await this.descricaoInput.getAttribute('value');
  }

  async setMarcaInput(marca: string): Promise<void> {
    await this.marcaInput.sendKeys(marca);
  }

  async getMarcaInput(): Promise<string> {
    return await this.marcaInput.getAttribute('value');
  }

  async setValorInput(valor: string): Promise<void> {
    await this.valorInput.sendKeys(valor);
  }

  async getValorInput(): Promise<string> {
    return await this.valorInput.getAttribute('value');
  }

  async setSituacaoSelect(situacao: string): Promise<void> {
    await this.situacaoSelect.sendKeys(situacao);
  }

  async getSituacaoSelect(): Promise<string> {
    return await this.situacaoSelect.element(by.css('option:checked')).getText();
  }

  async situacaoSelectLastOption(): Promise<void> {
    await this.situacaoSelect.all(by.tagName('option')).last().click();
  }

  async setSerieInput(serie: string): Promise<void> {
    await this.serieInput.sendKeys(serie);
  }

  async getSerieInput(): Promise<string> {
    return await this.serieInput.getAttribute('value');
  }

  async setLoteInput(lote: string): Promise<void> {
    await this.loteInput.sendKeys(lote);
  }

  async getLoteInput(): Promise<string> {
    return await this.loteInput.getAttribute('value');
  }

  async setTamanhoInput(tamanho: string): Promise<void> {
    await this.tamanhoInput.sendKeys(tamanho);
  }

  async getTamanhoInput(): Promise<string> {
    return await this.tamanhoInput.getAttribute('value');
  }

  async tipoMaterialSelectLastOption(): Promise<void> {
    await this.tipoMaterialSelect.all(by.tagName('option')).last().click();
  }

  async tipoMaterialSelectOption(option: string): Promise<void> {
    await this.tipoMaterialSelect.sendKeys(option);
  }

  getTipoMaterialSelect(): ElementFinder {
    return this.tipoMaterialSelect;
  }

  async getTipoMaterialSelectedOption(): Promise<string> {
    return await this.tipoMaterialSelect.element(by.css('option:checked')).getText();
  }

  async tipoArmaSelectLastOption(): Promise<void> {
    await this.tipoArmaSelect.all(by.tagName('option')).last().click();
  }

  async tipoArmaSelectOption(option: string): Promise<void> {
    await this.tipoArmaSelect.sendKeys(option);
  }

  getTipoArmaSelect(): ElementFinder {
    return this.tipoArmaSelect;
  }

  async getTipoArmaSelectedOption(): Promise<string> {
    return await this.tipoArmaSelect.element(by.css('option:checked')).getText();
  }

  async calibreSelectLastOption(): Promise<void> {
    await this.calibreSelect.all(by.tagName('option')).last().click();
  }

  async calibreSelectOption(option: string): Promise<void> {
    await this.calibreSelect.sendKeys(option);
  }

  getCalibreSelect(): ElementFinder {
    return this.calibreSelect;
  }

  async getCalibreSelectedOption(): Promise<string> {
    return await this.calibreSelect.element(by.css('option:checked')).getText();
  }

  async fornecedorSelectLastOption(): Promise<void> {
    await this.fornecedorSelect.all(by.tagName('option')).last().click();
  }

  async fornecedorSelectOption(option: string): Promise<void> {
    await this.fornecedorSelect.sendKeys(option);
  }

  getFornecedorSelect(): ElementFinder {
    return this.fornecedorSelect;
  }

  async getFornecedorSelectedOption(): Promise<string> {
    return await this.fornecedorSelect.element(by.css('option:checked')).getText();
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

export class MaterialDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-material-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-material'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
