package br.mp.mpf.ssin.repository;

import br.mp.mpf.ssin.domain.ItemAcautelamento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ItemAcautelamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemAcautelamentoRepository extends JpaRepository<ItemAcautelamento, Long> {
}
