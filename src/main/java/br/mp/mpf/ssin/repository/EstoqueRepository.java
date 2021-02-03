package br.mp.mpf.ssin.repository;

import br.mp.mpf.ssin.domain.Estoque;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Estoque entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstoqueRepository extends JpaRepository<Estoque, Long> {
}
