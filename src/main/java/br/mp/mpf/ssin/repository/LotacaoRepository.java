package br.mp.mpf.ssin.repository;

import br.mp.mpf.ssin.domain.Lotacao;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Lotacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LotacaoRepository extends JpaRepository<Lotacao, Long> {
}
