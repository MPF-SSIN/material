package br.mp.mpf.ssin.repository;

import br.mp.mpf.ssin.domain.Acautelamento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Acautelamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcautelamentoRepository extends JpaRepository<Acautelamento, Long> {
}
