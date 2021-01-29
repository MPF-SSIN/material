package br.mp.mpf.ssin.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * Craf entity\n@author Leandro Iglezias.
 */
@ApiModel(description = "Craf entity\n@author Leandro Iglezias.")
@Entity
@Table(name = "craf")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Craf implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "numero", nullable = false)
    private String numero;

    @NotNull
    @Column(name = "data_emissao", nullable = false)
    private LocalDate dataEmissao;

    @NotNull
    @Column(name = "data_validade", nullable = false)
    private LocalDate dataValidade;

    @OneToOne
    @JoinColumn(unique = true)
    private Material arma;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public Craf numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public LocalDate getDataEmissao() {
        return dataEmissao;
    }

    public Craf dataEmissao(LocalDate dataEmissao) {
        this.dataEmissao = dataEmissao;
        return this;
    }

    public void setDataEmissao(LocalDate dataEmissao) {
        this.dataEmissao = dataEmissao;
    }

    public LocalDate getDataValidade() {
        return dataValidade;
    }

    public Craf dataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
        return this;
    }

    public void setDataValidade(LocalDate dataValidade) {
        this.dataValidade = dataValidade;
    }

    public Material getArma() {
        return arma;
    }

    public Craf arma(Material material) {
        this.arma = material;
        return this;
    }

    public void setArma(Material material) {
        this.arma = material;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Craf)) {
            return false;
        }
        return id != null && id.equals(((Craf) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Craf{" +
            "id=" + getId() +
            ", numero='" + getNumero() + "'" +
            ", dataEmissao='" + getDataEmissao() + "'" +
            ", dataValidade='" + getDataValidade() + "'" +
            "}";
    }
}
