package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.SsinApp;
import br.mp.mpf.ssin.domain.ItemAcautelamento;
import br.mp.mpf.ssin.repository.ItemAcautelamentoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ItemAcautelamentoResource} REST controller.
 */
@SpringBootTest(classes = SsinApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ItemAcautelamentoResourceIT {

    private static final Integer DEFAULT_QUANTIDADE = 1;
    private static final Integer UPDATED_QUANTIDADE = 2;

    private static final Double DEFAULT_VALOR_UNITARIO = 1D;
    private static final Double UPDATED_VALOR_UNITARIO = 2D;

    @Autowired
    private ItemAcautelamentoRepository itemAcautelamentoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restItemAcautelamentoMockMvc;

    private ItemAcautelamento itemAcautelamento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemAcautelamento createEntity(EntityManager em) {
        ItemAcautelamento itemAcautelamento = new ItemAcautelamento()
            .quantidade(DEFAULT_QUANTIDADE)
            .valorUnitario(DEFAULT_VALOR_UNITARIO);
        return itemAcautelamento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemAcautelamento createUpdatedEntity(EntityManager em) {
        ItemAcautelamento itemAcautelamento = new ItemAcautelamento()
            .quantidade(UPDATED_QUANTIDADE)
            .valorUnitario(UPDATED_VALOR_UNITARIO);
        return itemAcautelamento;
    }

    @BeforeEach
    public void initTest() {
        itemAcautelamento = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemAcautelamento() throws Exception {
        int databaseSizeBeforeCreate = itemAcautelamentoRepository.findAll().size();
        // Create the ItemAcautelamento
        restItemAcautelamentoMockMvc.perform(post("/api/item-acautelamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemAcautelamento)))
            .andExpect(status().isCreated());

        // Validate the ItemAcautelamento in the database
        List<ItemAcautelamento> itemAcautelamentoList = itemAcautelamentoRepository.findAll();
        assertThat(itemAcautelamentoList).hasSize(databaseSizeBeforeCreate + 1);
        ItemAcautelamento testItemAcautelamento = itemAcautelamentoList.get(itemAcautelamentoList.size() - 1);
        assertThat(testItemAcautelamento.getQuantidade()).isEqualTo(DEFAULT_QUANTIDADE);
        assertThat(testItemAcautelamento.getValorUnitario()).isEqualTo(DEFAULT_VALOR_UNITARIO);
    }

    @Test
    @Transactional
    public void createItemAcautelamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemAcautelamentoRepository.findAll().size();

        // Create the ItemAcautelamento with an existing ID
        itemAcautelamento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemAcautelamentoMockMvc.perform(post("/api/item-acautelamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemAcautelamento)))
            .andExpect(status().isBadRequest());

        // Validate the ItemAcautelamento in the database
        List<ItemAcautelamento> itemAcautelamentoList = itemAcautelamentoRepository.findAll();
        assertThat(itemAcautelamentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantidadeIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemAcautelamentoRepository.findAll().size();
        // set the field null
        itemAcautelamento.setQuantidade(null);

        // Create the ItemAcautelamento, which fails.


        restItemAcautelamentoMockMvc.perform(post("/api/item-acautelamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemAcautelamento)))
            .andExpect(status().isBadRequest());

        List<ItemAcautelamento> itemAcautelamentoList = itemAcautelamentoRepository.findAll();
        assertThat(itemAcautelamentoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValorUnitarioIsRequired() throws Exception {
        int databaseSizeBeforeTest = itemAcautelamentoRepository.findAll().size();
        // set the field null
        itemAcautelamento.setValorUnitario(null);

        // Create the ItemAcautelamento, which fails.


        restItemAcautelamentoMockMvc.perform(post("/api/item-acautelamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemAcautelamento)))
            .andExpect(status().isBadRequest());

        List<ItemAcautelamento> itemAcautelamentoList = itemAcautelamentoRepository.findAll();
        assertThat(itemAcautelamentoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllItemAcautelamentos() throws Exception {
        // Initialize the database
        itemAcautelamentoRepository.saveAndFlush(itemAcautelamento);

        // Get all the itemAcautelamentoList
        restItemAcautelamentoMockMvc.perform(get("/api/item-acautelamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemAcautelamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantidade").value(hasItem(DEFAULT_QUANTIDADE)))
            .andExpect(jsonPath("$.[*].valorUnitario").value(hasItem(DEFAULT_VALOR_UNITARIO.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getItemAcautelamento() throws Exception {
        // Initialize the database
        itemAcautelamentoRepository.saveAndFlush(itemAcautelamento);

        // Get the itemAcautelamento
        restItemAcautelamentoMockMvc.perform(get("/api/item-acautelamentos/{id}", itemAcautelamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(itemAcautelamento.getId().intValue()))
            .andExpect(jsonPath("$.quantidade").value(DEFAULT_QUANTIDADE))
            .andExpect(jsonPath("$.valorUnitario").value(DEFAULT_VALOR_UNITARIO.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingItemAcautelamento() throws Exception {
        // Get the itemAcautelamento
        restItemAcautelamentoMockMvc.perform(get("/api/item-acautelamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemAcautelamento() throws Exception {
        // Initialize the database
        itemAcautelamentoRepository.saveAndFlush(itemAcautelamento);

        int databaseSizeBeforeUpdate = itemAcautelamentoRepository.findAll().size();

        // Update the itemAcautelamento
        ItemAcautelamento updatedItemAcautelamento = itemAcautelamentoRepository.findById(itemAcautelamento.getId()).get();
        // Disconnect from session so that the updates on updatedItemAcautelamento are not directly saved in db
        em.detach(updatedItemAcautelamento);
        updatedItemAcautelamento
            .quantidade(UPDATED_QUANTIDADE)
            .valorUnitario(UPDATED_VALOR_UNITARIO);

        restItemAcautelamentoMockMvc.perform(put("/api/item-acautelamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemAcautelamento)))
            .andExpect(status().isOk());

        // Validate the ItemAcautelamento in the database
        List<ItemAcautelamento> itemAcautelamentoList = itemAcautelamentoRepository.findAll();
        assertThat(itemAcautelamentoList).hasSize(databaseSizeBeforeUpdate);
        ItemAcautelamento testItemAcautelamento = itemAcautelamentoList.get(itemAcautelamentoList.size() - 1);
        assertThat(testItemAcautelamento.getQuantidade()).isEqualTo(UPDATED_QUANTIDADE);
        assertThat(testItemAcautelamento.getValorUnitario()).isEqualTo(UPDATED_VALOR_UNITARIO);
    }

    @Test
    @Transactional
    public void updateNonExistingItemAcautelamento() throws Exception {
        int databaseSizeBeforeUpdate = itemAcautelamentoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemAcautelamentoMockMvc.perform(put("/api/item-acautelamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(itemAcautelamento)))
            .andExpect(status().isBadRequest());

        // Validate the ItemAcautelamento in the database
        List<ItemAcautelamento> itemAcautelamentoList = itemAcautelamentoRepository.findAll();
        assertThat(itemAcautelamentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemAcautelamento() throws Exception {
        // Initialize the database
        itemAcautelamentoRepository.saveAndFlush(itemAcautelamento);

        int databaseSizeBeforeDelete = itemAcautelamentoRepository.findAll().size();

        // Delete the itemAcautelamento
        restItemAcautelamentoMockMvc.perform(delete("/api/item-acautelamentos/{id}", itemAcautelamento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemAcautelamento> itemAcautelamentoList = itemAcautelamentoRepository.findAll();
        assertThat(itemAcautelamentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
