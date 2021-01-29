package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.domain.Craf;
import br.mp.mpf.ssin.repository.CrafRepository;
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
 * REST controller for managing {@link br.mp.mpf.ssin.domain.Craf}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CrafResource {

    private final Logger log = LoggerFactory.getLogger(CrafResource.class);

    private static final String ENTITY_NAME = "craf";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CrafRepository crafRepository;

    public CrafResource(CrafRepository crafRepository) {
        this.crafRepository = crafRepository;
    }

    /**
     * {@code POST  /crafs} : Create a new craf.
     *
     * @param craf the craf to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new craf, or with status {@code 400 (Bad Request)} if the craf has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/crafs")
    public ResponseEntity<Craf> createCraf(@Valid @RequestBody Craf craf) throws URISyntaxException {
        log.debug("REST request to save Craf : {}", craf);
        if (craf.getId() != null) {
            throw new BadRequestAlertException("A new craf cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Craf result = crafRepository.save(craf);
        return ResponseEntity.created(new URI("/api/crafs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /crafs} : Updates an existing craf.
     *
     * @param craf the craf to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated craf,
     * or with status {@code 400 (Bad Request)} if the craf is not valid,
     * or with status {@code 500 (Internal Server Error)} if the craf couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/crafs")
    public ResponseEntity<Craf> updateCraf(@Valid @RequestBody Craf craf) throws URISyntaxException {
        log.debug("REST request to update Craf : {}", craf);
        if (craf.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Craf result = crafRepository.save(craf);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, craf.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /crafs} : get all the crafs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of crafs in body.
     */
    @GetMapping("/crafs")
    public List<Craf> getAllCrafs() {
        log.debug("REST request to get all Crafs");
        return crafRepository.findAll();
    }

    /**
     * {@code GET  /crafs/:id} : get the "id" craf.
     *
     * @param id the id of the craf to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the craf, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/crafs/{id}")
    public ResponseEntity<Craf> getCraf(@PathVariable Long id) {
        log.debug("REST request to get Craf : {}", id);
        Optional<Craf> craf = crafRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(craf);
    }

    /**
     * {@code DELETE  /crafs/:id} : delete the "id" craf.
     *
     * @param id the id of the craf to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/crafs/{id}")
    public ResponseEntity<Void> deleteCraf(@PathVariable Long id) {
        log.debug("REST request to delete Craf : {}", id);
        crafRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
