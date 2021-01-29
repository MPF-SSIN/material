package br.mp.mpf.ssin.repository;

import br.mp.mpf.ssin.domain.TipoArma;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TipoArma entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoArmaRepository extends JpaRepository<TipoArma, Long> {
}
