package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.domain.TipoArma;
import br.mp.mpf.ssin.repository.TipoArmaRepository;
import br.mp.mpf.ssin.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.mp.mpf.ssin.domain.TipoArma}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoArmaResource {

    private final Logger log = LoggerFactory.getLogger(TipoArmaResource.class);

    private static final String ENTITY_NAME = "tipoArma";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoArmaRepository tipoArmaRepository;

    public TipoArmaResource(TipoArmaRepository tipoArmaRepository) {
        this.tipoArmaRepository = tipoArmaRepository;
    }

    /**
     * {@code POST  /tipo-armas} : Create a new tipoArma.
     *
     * @param tipoArma the tipoArma to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoArma, or with status {@code 400 (Bad Request)} if the tipoArma has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-armas")
    public ResponseEntity<TipoArma> createTipoArma(@Valid @RequestBody TipoArma tipoArma) throws URISyntaxException {
        log.debug("REST request to save TipoArma : {}", tipoArma);
        if (tipoArma.getId() != null) {
            throw new BadRequestAlertException("A new tipoArma cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoArma result = tipoArmaRepository.save(tipoArma);
        return ResponseEntity.created(new URI("/api/tipo-armas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-armas} : Updates an existing tipoArma.
     *
     * @param tipoArma the tipoArma to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoArma,
     * or with status {@code 400 (Bad Request)} if the tipoArma is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoArma couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-armas")
    public ResponseEntity<TipoArma> updateTipoArma(@Valid @RequestBody TipoArma tipoArma) throws URISyntaxException {
        log.debug("REST request to update TipoArma : {}", tipoArma);
        if (tipoArma.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoArma result = tipoArmaRepository.save(tipoArma);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoArma.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-armas} : get all the tipoArmas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoArmas in body.
     */
    @GetMapping("/tipo-armas")
    public List<TipoArma> getAllTipoArmas() {
        log.debug("REST request to get all TipoArmas");
        return tipoArmaRepository.findAll();
    }

    /**
     * {@code GET  /tipo-armas/:id} : get the "id" tipoArma.
     *
     * @param id the id of the tipoArma to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoArma, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-armas/{id}")
    public ResponseEntity<TipoArma> getTipoArma(@PathVariable Long id) {
        log.debug("REST request to get TipoArma : {}", id);
        Optional<TipoArma> tipoArma = tipoArmaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoArma);
    }

    /**
     * {@code DELETE  /tipo-armas/:id} : delete the "id" tipoArma.
     *
     * @param id the id of the tipoArma to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-armas/{id}")
    public ResponseEntity<Void> deleteTipoArma(@PathVariable Long id) {
        log.debug("REST request to delete TipoArma : {}", id);
        tipoArmaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
