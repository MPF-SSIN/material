package br.mp.mpf.ssin.repository;

import br.mp.mpf.ssin.domain.Craf;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Craf entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CrafRepository extends JpaRepository<Craf, Long> {
}
