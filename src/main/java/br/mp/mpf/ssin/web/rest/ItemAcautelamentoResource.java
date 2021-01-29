package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.domain.ItemAcautelamento;
import br.mp.mpf.ssin.repository.ItemAcautelamentoRepository;
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
 * REST controller for managing {@link br.mp.mpf.ssin.domain.ItemAcautelamento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ItemAcautelamentoResource {

    private final Logger log = LoggerFactory.getLogger(ItemAcautelamentoResource.class);

    private static final String ENTITY_NAME = "itemAcautelamento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ItemAcautelamentoRepository itemAcautelamentoRepository;

    public ItemAcautelamentoResource(ItemAcautelamentoRepository itemAcautelamentoRepository) {
        this.itemAcautelamentoRepository = itemAcautelamentoRepository;
    }

    /**
     * {@code POST  /item-acautelamentos} : Create a new itemAcautelamento.
     *
     * @param itemAcautelamento the itemAcautelamento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new itemAcautelamento, or with status {@code 400 (Bad Request)} if the itemAcautelamento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/item-acautelamentos")
    public ResponseEntity<ItemAcautelamento> createItemAcautelamento(@Valid @RequestBody ItemAcautelamento itemAcautelamento) throws URISyntaxException {
        log.debug("REST request to save ItemAcautelamento : {}", itemAcautelamento);
        if (itemAcautelamento.getId() != null) {
            throw new BadRequestAlertException("A new itemAcautelamento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ItemAcautelamento result = itemAcautelamentoRepository.save(itemAcautelamento);
        return ResponseEntity.created(new URI("/api/item-acautelamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /item-acautelamentos} : Updates an existing itemAcautelamento.
     *
     * @param itemAcautelamento the itemAcautelamento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated itemAcautelamento,
     * or with status {@code 400 (Bad Request)} if the itemAcautelamento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the itemAcautelamento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/item-acautelamentos")
    public ResponseEntity<ItemAcautelamento> updateItemAcautelamento(@Valid @RequestBody ItemAcautelamento itemAcautelamento) throws URISyntaxException {
        log.debug("REST request to update ItemAcautelamento : {}", itemAcautelamento);
        if (itemAcautelamento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ItemAcautelamento result = itemAcautelamentoRepository.save(itemAcautelamento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, itemAcautelamento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /item-acautelamentos} : get all the itemAcautelamentos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of itemAcautelamentos in body.
     */
    @GetMapping("/item-acautelamentos")
    public List<ItemAcautelamento> getAllItemAcautelamentos() {
        log.debug("REST request to get all ItemAcautelamentos");
        return itemAcautelamentoRepository.findAll();
    }

    /**
     * {@code GET  /item-acautelamentos/:id} : get the "id" itemAcautelamento.
     *
     * @param id the id of the itemAcautelamento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the itemAcautelamento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/item-acautelamentos/{id}")
    public ResponseEntity<ItemAcautelamento> getItemAcautelamento(@PathVariable Long id) {
        log.debug("REST request to get ItemAcautelamento : {}", id);
        Optional<ItemAcautelamento> itemAcautelamento = itemAcautelamentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(itemAcautelamento);
    }

    /**
     * {@code DELETE  /item-acautelamentos/:id} : delete the "id" itemAcautelamento.
     *
     * @param id the id of the itemAcautelamento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/item-acautelamentos/{id}")
    public ResponseEntity<Void> deleteItemAcautelamento(@PathVariable Long id) {
        log.debug("REST request to delete ItemAcautelamento : {}", id);
        itemAcautelamentoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
