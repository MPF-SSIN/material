package br.mp.mpf.ssin.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * Calibre entity\n@author Leandro Iglezias.\n.380/9mm Lugar/.40 Auto/5.56 NATO/12 Gauge
 */
@ApiModel(description = "Calibre entity\n@author Leandro Iglezias.\n.380/9mm Lugar/.40 Auto/5.56 NATO/12 Gauge")
@Entity
@Table(name = "calibre")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Calibre implements Serializable {

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

    public Calibre nome(String nome) {
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
        if (!(o instanceof Calibre)) {
            return false;
        }
        return id != null && id.equals(((Calibre) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Calibre{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
