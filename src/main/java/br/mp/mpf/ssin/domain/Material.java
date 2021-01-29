package br.mp.mpf.ssin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import br.mp.mpf.ssin.domain.enumeration.SituacaoMaterial;

/**
 * Material entity\n@author Leandro Iglezias.
 */
@ApiModel(description = "Material entity\n@author Leandro Iglezias.")
@Entity
@Table(name = "material")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Material implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "descricao", nullable = false)
    private String descricao;

    @NotNull
    @Column(name = "marca", nullable = false)
    private String marca;

    @NotNull
    @Column(name = "valor", nullable = false)
    private Double valor;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao")
    private SituacaoMaterial situacao;

    @Column(name = "serie")
    private String serie;

    @Column(name = "lote")
    private String lote;

    @Column(name = "tamanho")
    private String tamanho;

    @ManyToOne
    @JsonIgnoreProperties(value = "materials", allowSetters = true)
    private TipoMaterial tipoMaterial;

    @ManyToOne
    @JsonIgnoreProperties(value = "materials", allowSetters = true)
    private TipoArma tipoArma;

    @ManyToOne
    @JsonIgnoreProperties(value = "materials", allowSetters = true)
    private Calibre calibre;

    @ManyToOne
    @JsonIgnoreProperties(value = "materials", allowSetters = true)
    private Fornecedor fornecedor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Material nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public Material descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getMarca() {
        return marca;
    }

    public Material marca(String marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Double getValor() {
        return valor;
    }

    public Material valor(Double valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public SituacaoMaterial getSituacao() {
        return situacao;
    }

    public Material situacao(SituacaoMaterial situacao) {
        this.situacao = situacao;
        return this;
    }

    public void setSituacao(SituacaoMaterial situacao) {
        this.situacao = situacao;
    }

    public String getSerie() {
        return serie;
    }

    public Material serie(String serie) {
        this.serie = serie;
        return this;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public String getLote() {
        return lote;
    }

    public Material lote(String lote) {
        this.lote = lote;
        return this;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public String getTamanho() {
        return tamanho;
    }

    public Material tamanho(String tamanho) {
        this.tamanho = tamanho;
        return this;
    }

    public void setTamanho(String tamanho) {
        this.tamanho = tamanho;
    }

    public TipoMaterial getTipoMaterial() {
        return tipoMaterial;
    }

    public Material tipoMaterial(TipoMaterial tipoMaterial) {
        this.tipoMaterial = tipoMaterial;
        return this;
    }

    public void setTipoMaterial(TipoMaterial tipoMaterial) {
        this.tipoMaterial = tipoMaterial;
    }

    public TipoArma getTipoArma() {
        return tipoArma;
    }

    public Material tipoArma(TipoArma tipoArma) {
        this.tipoArma = tipoArma;
        return this;
    }

    public void setTipoArma(TipoArma tipoArma) {
        this.tipoArma = tipoArma;
    }

    public Calibre getCalibre() {
        return calibre;
    }

    public Material calibre(Calibre calibre) {
        this.calibre = calibre;
        return this;
    }

    public void setCalibre(Calibre calibre) {
        this.calibre = calibre;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    public Material fornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
        return this;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Material)) {
            return false;
        }
        return id != null && id.equals(((Material) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Material{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", marca='" + getMarca() + "'" +
            ", valor=" + getValor() +
            ", situacao='" + getSituacao() + "'" +
            ", serie='" + getSerie() + "'" +
            ", lote='" + getLote() + "'" +
            ", tamanho='" + getTamanho() + "'" +
            "}";
    }
}
