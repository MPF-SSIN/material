package br.mp.mpf.ssin.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * Tipo Material entity\n@author Leandro Iglezias.\nArma/Munição/Colete Balístico/Equipamento/Vestuário
 */
@ApiModel(description = "Tipo Material entity\n@author Leandro Iglezias.\nArma/Munição/Colete Balístico/Equipamento/Vestuário")
@Entity
@Table(name = "tipo_material")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TipoMaterial implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
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

    public TipoMaterial nome(String nome) {
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
        if (!(o instanceof TipoMaterial)) {
            return false;
        }
        return id != null && id.equals(((TipoMaterial) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoMaterial{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
