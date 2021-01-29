package br.mp.mpf.ssin.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * TipoArma entity\n@author Leandro Iglezias.\nPistola/Fuzil/Submetralhadora\nEspingarda/Choque/
 */
@ApiModel(description = "TipoArma entity\n@author Leandro Iglezias.\nPistola/Fuzil/Submetralhadora\nEspingarda/Choque/")
@Entity
@Table(name = "tipo_arma")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TipoArma implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

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

    public TipoArma nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoArma)) {
            return false;
        }
        return id != null && id.equals(((TipoArma) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoArma{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
