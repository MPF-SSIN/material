package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.domain.TipoMaterial;
import br.mp.mpf.ssin.repository.TipoMaterialRepository;
import br.mp.mpf.ssin.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.mp.mpf.ssin.domain.TipoMaterial}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TipoMaterialResource {

    private final Logger log = LoggerFactory.getLogger(TipoMaterialResource.class);

    private static final String ENTITY_NAME = "tipoMaterial";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoMaterialRepository tipoMaterialRepository;

    public TipoMaterialResource(TipoMaterialRepository tipoMaterialRepository) {
        this.tipoMaterialRepository = tipoMaterialRepository;
    }

    /**
     * {@code POST  /tipo-materials} : Create a new tipoMaterial.
     *
     * @param tipoMaterial the tipoMaterial to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoMaterial, or with status {@code 400 (Bad Request)} if the tipoMaterial has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-materials")
    public ResponseEntity<TipoMaterial> createTipoMaterial(@RequestBody TipoMaterial tipoMaterial) throws URISyntaxException {
        log.debug("REST request to save TipoMaterial : {}", tipoMaterial);
        if (tipoMaterial.getId() != null) {
            throw new BadRequestAlertException("A new tipoMaterial cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoMaterial result = tipoMaterialRepository.save(tipoMaterial);
        return ResponseEntity.created(new URI("/api/tipo-materials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-materials} : Updates an existing tipoMaterial.
     *
     * @param tipoMaterial the tipoMaterial to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoMaterial,
     * or with status {@code 400 (Bad Request)} if the tipoMaterial is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoMaterial couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-materials")
    public ResponseEntity<TipoMaterial> updateTipoMaterial(@RequestBody TipoMaterial tipoMaterial) throws URISyntaxException {
        log.debug("REST request to update TipoMaterial : {}", tipoMaterial);
        if (tipoMaterial.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoMaterial result = tipoMaterialRepository.save(tipoMaterial);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoMaterial.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-materials} : get all the tipoMaterials.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoMaterials in body.
     */
    @GetMapping("/tipo-materials")
    public List<TipoMaterial> getAllTipoMaterials() {
        log.debug("REST request to get all TipoMaterials");
        return tipoMaterialRepository.findAll();
    }

    /**
     * {@code GET  /tipo-materials/:id} : get the "id" tipoMaterial.
     *
     * @param id the id of the tipoMaterial to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoMaterial, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-materials/{id}")
    public ResponseEntity<TipoMaterial> getTipoMaterial(@PathVariable Long id) {
        log.debug("REST request to get TipoMaterial : {}", id);
        Optional<TipoMaterial> tipoMaterial = tipoMaterialRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoMaterial);
    }

    /**
     * {@code DELETE  /tipo-materials/:id} : delete the "id" tipoMaterial.
     *
     * @param id the id of the tipoMaterial to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-materials/{id}")
    public ResponseEntity<Void> deleteTipoMaterial(@PathVariable Long id) {
        log.debug("REST request to delete TipoMaterial : {}", id);
        tipoMaterialRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
