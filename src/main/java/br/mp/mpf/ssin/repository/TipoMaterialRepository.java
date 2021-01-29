package br.mp.mpf.ssin.repository;

import br.mp.mpf.ssin.domain.TipoMaterial;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoMaterial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoMaterialRepository extends JpaRepository<TipoMaterial, Long> {
}
