package br.mp.mpf.ssin.repository;

import br.mp.mpf.ssin.domain.Pessoa;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Pessoa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
}
