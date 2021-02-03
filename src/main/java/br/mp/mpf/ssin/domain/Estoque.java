package br.mp.mpf.ssin.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * Estoque entity\n@author Leandro Iglezias.
 */
@ApiModel(description = "Estoque entity\n@author Leandro Iglezias.")
@Entity
@Table(name = "estoque")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Estoque implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

    @NotNull
    @Column(name = "localizacao", nullable = false)
    private String localizacao;

    @OneToOne
    @JoinColumn(unique = true)
    private Material material;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public Estoque quantidade(Integer quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public Estoque localizacao(String localizacao) {
        this.localizacao = localizacao;
        return this;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public Material getMaterial() {
        return material;
    }

    public Estoque material(Material material) {
        this.material = material;
        return this;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Estoque)) {
            return false;
        }
        return id != null && id.equals(((Estoque) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Estoque{" +
            "id=" + getId() +
            ", quantidade=" + getQuantidade() +
            ", localizacao='" + getLocalizacao() + "'" +
            "}";
    }
}
