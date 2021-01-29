package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.domain.Acautelamento;
import br.mp.mpf.ssin.repository.AcautelamentoRepository;
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
 * REST controller for managing {@link br.mp.mpf.ssin.domain.Acautelamento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AcautelamentoResource {

    private final Logger log = LoggerFactory.getLogger(AcautelamentoResource.class);

    private static final String ENTITY_NAME = "acautelamento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AcautelamentoRepository acautelamentoRepository;

    public AcautelamentoResource(AcautelamentoRepository acautelamentoRepository) {
        this.acautelamentoRepository = acautelamentoRepository;
    }

    /**
     * {@code POST  /acautelamentos} : Create a new acautelamento.
     *
     * @param acautelamento the acautelamento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new acautelamento, or with status {@code 400 (Bad Request)} if the acautelamento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/acautelamentos")
    public ResponseEntity<Acautelamento> createAcautelamento(@Valid @RequestBody Acautelamento acautelamento) throws URISyntaxException {
        log.debug("REST request to save Acautelamento : {}", acautelamento);
        if (acautelamento.getId() != null) {
            throw new BadRequestAlertException("A new acautelamento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Acautelamento result = acautelamentoRepository.save(acautelamento);
        return ResponseEntity.created(new URI("/api/acautelamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /acautelamentos} : Updates an existing acautelamento.
     *
     * @param acautelamento the acautelamento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated acautelamento,
     * or with status {@code 400 (Bad Request)} if the acautelamento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the acautelamento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/acautelamentos")
    public ResponseEntity<Acautelamento> updateAcautelamento(@Valid @RequestBody Acautelamento acautelamento) throws URISyntaxException {
        log.debug("REST request to update Acautelamento : {}", acautelamento);
        if (acautelamento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Acautelamento result = acautelamentoRepository.save(acautelamento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, acautelamento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /acautelamentos} : get all the acautelamentos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of acautelamentos in body.
     */
    @GetMapping("/acautelamentos")
    public List<Acautelamento> getAllAcautelamentos() {
        log.debug("REST request to get all Acautelamentos");
        return acautelamentoRepository.findAll();
    }

    /**
     * {@code GET  /acautelamentos/:id} : get the "id" acautelamento.
     *
     * @param id the id of the acautelamento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the acautelamento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/acautelamentos/{id}")
    public ResponseEntity<Acautelamento> getAcautelamento(@PathVariable Long id) {
        log.debug("REST request to get Acautelamento : {}", id);
        Optional<Acautelamento> acautelamento = acautelamentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(acautelamento);
    }

    /**
     * {@code DELETE  /acautelamentos/:id} : delete the "id" acautelamento.
     *
     * @param id the id of the acautelamento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/acautelamentos/{id}")
    public ResponseEntity<Void> deleteAcautelamento(@PathVariable Long id) {
        log.debug("REST request to delete Acautelamento : {}", id);
        acautelamentoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
