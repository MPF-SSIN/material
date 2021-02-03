package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.SsinApp;
import br.mp.mpf.ssin.domain.Estoque;
import br.mp.mpf.ssin.repository.EstoqueRepository;

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
 * Integration tests for the {@link EstoqueResource} REST controller.
 */
@SpringBootTest(classes = SsinApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EstoqueResourceIT {

    private static final Integer DEFAULT_QUANTIDADE = 1;
    private static final Integer UPDATED_QUANTIDADE = 2;

    private static final String DEFAULT_LOCALIZACAO = "AAAAAAAAAA";
    private static final String UPDATED_LOCALIZACAO = "BBBBBBBBBB";

    @Autowired
    private EstoqueRepository estoqueRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEstoqueMockMvc;

    private Estoque estoque;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estoque createEntity(EntityManager em) {
        Estoque estoque = new Estoque()
            .quantidade(DEFAULT_QUANTIDADE)
            .localizacao(DEFAULT_LOCALIZACAO);
        return estoque;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Estoque createUpdatedEntity(EntityManager em) {
        Estoque estoque = new Estoque()
            .quantidade(UPDATED_QUANTIDADE)
            .localizacao(UPDATED_LOCALIZACAO);
        return estoque;
    }

    @BeforeEach
    public void initTest() {
        estoque = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstoque() throws Exception {
        int databaseSizeBeforeCreate = estoqueRepository.findAll().size();
        // Create the Estoque
        restEstoqueMockMvc.perform(post("/api/estoques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estoque)))
            .andExpect(status().isCreated());

        // Validate the Estoque in the database
        List<Estoque> estoqueList = estoqueRepository.findAll();
        assertThat(estoqueList).hasSize(databaseSizeBeforeCreate + 1);
        Estoque testEstoque = estoqueList.get(estoqueList.size() - 1);
        assertThat(testEstoque.getQuantidade()).isEqualTo(DEFAULT_QUANTIDADE);
        assertThat(testEstoque.getLocalizacao()).isEqualTo(DEFAULT_LOCALIZACAO);
    }

    @Test
    @Transactional
    public void createEstoqueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estoqueRepository.findAll().size();

        // Create the Estoque with an existing ID
        estoque.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstoqueMockMvc.perform(post("/api/estoques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estoque)))
            .andExpect(status().isBadRequest());

        // Validate the Estoque in the database
        List<Estoque> estoqueList = estoqueRepository.findAll();
        assertThat(estoqueList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantidadeIsRequired() throws Exception {
        int databaseSizeBeforeTest = estoqueRepository.findAll().size();
        // set the field null
        estoque.setQuantidade(null);

        // Create the Estoque, which fails.


        restEstoqueMockMvc.perform(post("/api/estoques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estoque)))
            .andExpect(status().isBadRequest());

        List<Estoque> estoqueList = estoqueRepository.findAll();
        assertThat(estoqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLocalizacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = estoqueRepository.findAll().size();
        // set the field null
        estoque.setLocalizacao(null);

        // Create the Estoque, which fails.


        restEstoqueMockMvc.perform(post("/api/estoques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estoque)))
            .andExpect(status().isBadRequest());

        List<Estoque> estoqueList = estoqueRepository.findAll();
        assertThat(estoqueList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEstoques() throws Exception {
        // Initialize the database
        estoqueRepository.saveAndFlush(estoque);

        // Get all the estoqueList
        restEstoqueMockMvc.perform(get("/api/estoques?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estoque.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantidade").value(hasItem(DEFAULT_QUANTIDADE)))
            .andExpect(jsonPath("$.[*].localizacao").value(hasItem(DEFAULT_LOCALIZACAO)));
    }
    
    @Test
    @Transactional
    public void getEstoque() throws Exception {
        // Initialize the database
        estoqueRepository.saveAndFlush(estoque);

        // Get the estoque
        restEstoqueMockMvc.perform(get("/api/estoques/{id}", estoque.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(estoque.getId().intValue()))
            .andExpect(jsonPath("$.quantidade").value(DEFAULT_QUANTIDADE))
            .andExpect(jsonPath("$.localizacao").value(DEFAULT_LOCALIZACAO));
    }
    @Test
    @Transactional
    public void getNonExistingEstoque() throws Exception {
        // Get the estoque
        restEstoqueMockMvc.perform(get("/api/estoques/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstoque() throws Exception {
        // Initialize the database
        estoqueRepository.saveAndFlush(estoque);

        int databaseSizeBeforeUpdate = estoqueRepository.findAll().size();

        // Update the estoque
        Estoque updatedEstoque = estoqueRepository.findById(estoque.getId()).get();
        // Disconnect from session so that the updates on updatedEstoque are not directly saved in db
        em.detach(updatedEstoque);
        updatedEstoque
            .quantidade(UPDATED_QUANTIDADE)
            .localizacao(UPDATED_LOCALIZACAO);

        restEstoqueMockMvc.perform(put("/api/estoques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstoque)))
            .andExpect(status().isOk());

        // Validate the Estoque in the database
        List<Estoque> estoqueList = estoqueRepository.findAll();
        assertThat(estoqueList).hasSize(databaseSizeBeforeUpdate);
        Estoque testEstoque = estoqueList.get(estoqueList.size() - 1);
        assertThat(testEstoque.getQuantidade()).isEqualTo(UPDATED_QUANTIDADE);
        assertThat(testEstoque.getLocalizacao()).isEqualTo(UPDATED_LOCALIZACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstoque() throws Exception {
        int databaseSizeBeforeUpdate = estoqueRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstoqueMockMvc.perform(put("/api/estoques")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(estoque)))
            .andExpect(status().isBadRequest());

        // Validate the Estoque in the database
        List<Estoque> estoqueList = estoqueRepository.findAll();
        assertThat(estoqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstoque() throws Exception {
        // Initialize the database
        estoqueRepository.saveAndFlush(estoque);

        int databaseSizeBeforeDelete = estoqueRepository.findAll().size();

        // Delete the estoque
        restEstoqueMockMvc.perform(delete("/api/estoques/{id}", estoque.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Estoque> estoqueList = estoqueRepository.findAll();
        assertThat(estoqueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
