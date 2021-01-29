package br.mp.mpf.ssin.repository;

import br.mp.mpf.ssin.domain.Calibre;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Calibre entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CalibreRepository extends JpaRepository<Calibre, Long> {
}
