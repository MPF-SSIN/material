package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.domain.Calibre;
import br.mp.mpf.ssin.repository.CalibreRepository;
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
 * REST controller for managing {@link br.mp.mpf.ssin.domain.Calibre}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CalibreResource {

    private final Logger log = LoggerFactory.getLogger(CalibreResource.class);

    private static final String ENTITY_NAME = "calibre";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CalibreRepository calibreRepository;

    public CalibreResource(CalibreRepository calibreRepository) {
        this.calibreRepository = calibreRepository;
    }

    /**
     * {@code POST  /calibres} : Create a new calibre.
     *
     * @param calibre the calibre to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new calibre, or with status {@code 400 (Bad Request)} if the calibre has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/calibres")
    public ResponseEntity<Calibre> createCalibre(@Valid @RequestBody Calibre calibre) throws URISyntaxException {
        log.debug("REST request to save Calibre : {}", calibre);
        if (calibre.getId() != null) {
            throw new BadRequestAlertException("A new calibre cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Calibre result = calibreRepository.save(calibre);
        return ResponseEntity.created(new URI("/api/calibres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /calibres} : Updates an existing calibre.
     *
     * @param calibre the calibre to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated calibre,
     * or with status {@code 400 (Bad Request)} if the calibre is not valid,
     * or with status {@code 500 (Internal Server Error)} if the calibre couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/calibres")
    public ResponseEntity<Calibre> updateCalibre(@Valid @RequestBody Calibre calibre) throws URISyntaxException {
        log.debug("REST request to update Calibre : {}", calibre);
        if (calibre.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Calibre result = calibreRepository.save(calibre);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, calibre.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /calibres} : get all the calibres.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of calibres in body.
     */
    @GetMapping("/calibres")
    public List<Calibre> getAllCalibres() {
        log.debug("REST request to get all Calibres");
        return calibreRepository.findAll();
    }

    /**
     * {@code GET  /calibres/:id} : get the "id" calibre.
     *
     * @param id the id of the calibre to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the calibre, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/calibres/{id}")
    public ResponseEntity<Calibre> getCalibre(@PathVariable Long id) {
        log.debug("REST request to get Calibre : {}", id);
        Optional<Calibre> calibre = calibreRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(calibre);
    }

    /**
     * {@code DELETE  /calibres/:id} : delete the "id" calibre.
     *
     * @param id the id of the calibre to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/calibres/{id}")
    public ResponseEntity<Void> deleteCalibre(@PathVariable Long id) {
        log.debug("REST request to delete Calibre : {}", id);
        calibreRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
