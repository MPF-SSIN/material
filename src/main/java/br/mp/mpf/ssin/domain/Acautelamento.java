package br.mp.mpf.ssin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * Acautelamento entity\n@author Leandro Iglezias.
 */
@ApiModel(description = "Acautelamento entity\n@author Leandro Iglezias.")
@Entity
@Table(name = "acautelamento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Acautelamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "numero", nullable = false, unique = true)
    private String numero;

    @NotNull
    @Column(name = "data_hora", nullable = false)
    private Instant dataHora;

    @Column(name = "data_hora_devolucao")
    private Instant dataHoraDevolucao;

    @Column(name = "obs")
    private String obs;

    @OneToMany(mappedBy = "acautelamento")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ItemAcautelamento> itens = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "acautelamentos", allowSetters = true)
    private Pessoa acautelante;

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

    public Acautelamento numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Instant getDataHora() {
        return dataHora;
    }

    public Acautelamento dataHora(Instant dataHora) {
        this.dataHora = dataHora;
        return this;
    }

    public void setDataHora(Instant dataHora) {
        this.dataHora = dataHora;
    }

    public Instant getDataHoraDevolucao() {
        return dataHoraDevolucao;
    }

    public Acautelamento dataHoraDevolucao(Instant dataHoraDevolucao) {
        this.dataHoraDevolucao = dataHoraDevolucao;
        return this;
    }

    public void setDataHoraDevolucao(Instant dataHoraDevolucao) {
        this.dataHoraDevolucao = dataHoraDevolucao;
    }

    public String getObs() {
        return obs;
    }

    public Acautelamento obs(String obs) {
        this.obs = obs;
        return this;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public Set<ItemAcautelamento> getItens() {
        return itens;
    }

    public Acautelamento itens(Set<ItemAcautelamento> itemAcautelamentos) {
        this.itens = itemAcautelamentos;
        return this;
    }

    public Acautelamento addItens(ItemAcautelamento itemAcautelamento) {
        this.itens.add(itemAcautelamento);
        itemAcautelamento.setAcautelamento(this);
        return this;
    }

    public Acautelamento removeItens(ItemAcautelamento itemAcautelamento) {
        this.itens.remove(itemAcautelamento);
        itemAcautelamento.setAcautelamento(null);
        return this;
    }

    public void setItens(Set<ItemAcautelamento> itemAcautelamentos) {
        this.itens = itemAcautelamentos;
    }

    public Pessoa getAcautelante() {
        return acautelante;
    }

    public Acautelamento acautelante(Pessoa pessoa) {
        this.acautelante = pessoa;
        return this;
    }

    public void setAcautelante(Pessoa pessoa) {
        this.acautelante = pessoa;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Acautelamento)) {
            return false;
        }
        return id != null && id.equals(((Acautelamento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Acautelamento{" +
            "id=" + getId() +
            ", numero='" + getNumero() + "'" +
            ", dataHora='" + getDataHora() + "'" +
            ", dataHoraDevolucao='" + getDataHoraDevolucao() + "'" +
            ", obs='" + getObs() + "'" +
            "}";
    }
}
