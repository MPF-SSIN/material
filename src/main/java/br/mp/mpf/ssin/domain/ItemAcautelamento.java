package br.mp.mpf.ssin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * ItemAcautelamento entity\n@author Leandro Iglezias.
 */
@ApiModel(description = "ItemAcautelamento entity\n@author Leandro Iglezias.")
@Entity
@Table(name = "item_acautelamento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ItemAcautelamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

    @NotNull
    @Column(name = "valor_unitario", nullable = false)
    private Double valorUnitario;

    @OneToOne
    @JoinColumn(unique = true)
    private Material material;

    @ManyToOne
    @JsonIgnoreProperties(value = "itens", allowSetters = true)
    private Acautelamento acautelamento;

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

    public ItemAcautelamento quantidade(Integer quantidade) {
        this.quantidade = quantidade;
        return this;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Double getValorUnitario() {
        return valorUnitario;
    }

    public ItemAcautelamento valorUnitario(Double valorUnitario) {
        this.valorUnitario = valorUnitario;
        return this;
    }

    public void setValorUnitario(Double valorUnitario) {
        this.valorUnitario = valorUnitario;
    }

    public Material getMaterial() {
        return material;
    }

    public ItemAcautelamento material(Material material) {
        this.material = material;
        return this;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public Acautelamento getAcautelamento() {
        return acautelamento;
    }

    public ItemAcautelamento acautelamento(Acautelamento acautelamento) {
        this.acautelamento = acautelamento;
        return this;
    }

    public void setAcautelamento(Acautelamento acautelamento) {
        this.acautelamento = acautelamento;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ItemAcautelamento)) {
            return false;
        }
        return id != null && id.equals(((ItemAcautelamento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ItemAcautelamento{" +
            "id=" + getId() +
            ", quantidade=" + getQuantidade() +
            ", valorUnitario=" + getValorUnitario() +
            "}";
    }
}
