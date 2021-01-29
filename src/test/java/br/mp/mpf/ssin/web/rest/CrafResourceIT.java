package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.SsinApp;
import br.mp.mpf.ssin.domain.Craf;
import br.mp.mpf.ssin.repository.CrafRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CrafResource} REST controller.
 */
@SpringBootTest(classes = SsinApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CrafResourceIT {

    private static final String DEFAULT_NUMERO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_EMISSAO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_EMISSAO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_VALIDADE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_VALIDADE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CrafRepository crafRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCrafMockMvc;

    private Craf craf;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Craf createEntity(EntityManager em) {
        Craf craf = new Craf()
            .numero(DEFAULT_NUMERO)
            .dataEmissao(DEFAULT_DATA_EMISSAO)
            .dataValidade(DEFAULT_DATA_VALIDADE);
        return craf;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Craf createUpdatedEntity(EntityManager em) {
        Craf craf = new Craf()
            .numero(UPDATED_NUMERO)
            .dataEmissao(UPDATED_DATA_EMISSAO)
            .dataValidade(UPDATED_DATA_VALIDADE);
        return craf;
    }

    @BeforeEach
    public void initTest() {
        craf = createEntity(em);
    }

    @Test
    @Transactional
    public void createCraf() throws Exception {
        int databaseSizeBeforeCreate = crafRepository.findAll().size();
        // Create the Craf
        restCrafMockMvc.perform(post("/api/crafs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(craf)))
            .andExpect(status().isCreated());

        // Validate the Craf in the database
        List<Craf> crafList = crafRepository.findAll();
        assertThat(crafList).hasSize(databaseSizeBeforeCreate + 1);
        Craf testCraf = crafList.get(crafList.size() - 1);
        assertThat(testCraf.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testCraf.getDataEmissao()).isEqualTo(DEFAULT_DATA_EMISSAO);
        assertThat(testCraf.getDataValidade()).isEqualTo(DEFAULT_DATA_VALIDADE);
    }

    @Test
    @Transactional
    public void createCrafWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = crafRepository.findAll().size();

        // Create the Craf with an existing ID
        craf.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCrafMockMvc.perform(post("/api/crafs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(craf)))
            .andExpect(status().isBadRequest());

        // Validate the Craf in the database
        List<Craf> crafList = crafRepository.findAll();
        assertThat(crafList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNumeroIsRequired() throws Exception {
        int databaseSizeBeforeTest = crafRepository.findAll().size();
        // set the field null
        craf.setNumero(null);

        // Create the Craf, which fails.


        restCrafMockMvc.perform(post("/api/crafs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(craf)))
            .andExpect(status().isBadRequest());

        List<Craf> crafList = crafRepository.findAll();
        assertThat(crafList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDataEmissaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = crafRepository.findAll().size();
        // set the field null
        craf.setDataEmissao(null);

        // Create the Craf, which fails.


        restCrafMockMvc.perform(post("/api/crafs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(craf)))
            .andExpect(status().isBadRequest());

        List<Craf> crafList = crafRepository.findAll();
        assertThat(crafList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDataValidadeIsRequired() throws Exception {
        int databaseSizeBeforeTest = crafRepository.findAll().size();
        // set the field null
        craf.setDataValidade(null);

        // Create the Craf, which fails.


        restCrafMockMvc.perform(post("/api/crafs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(craf)))
            .andExpect(status().isBadRequest());

        List<Craf> crafList = crafRepository.findAll();
        assertThat(crafList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCrafs() throws Exception {
        // Initialize the database
        crafRepository.saveAndFlush(craf);

        // Get all the crafList
        restCrafMockMvc.perform(get("/api/crafs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(craf.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].dataEmissao").value(hasItem(DEFAULT_DATA_EMISSAO.toString())))
            .andExpect(jsonPath("$.[*].dataValidade").value(hasItem(DEFAULT_DATA_VALIDADE.toString())));
    }
    
    @Test
    @Transactional
    public void getCraf() throws Exception {
        // Initialize the database
        crafRepository.saveAndFlush(craf);

        // Get the craf
        restCrafMockMvc.perform(get("/api/crafs/{id}", craf.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(craf.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.dataEmissao").value(DEFAULT_DATA_EMISSAO.toString()))
            .andExpect(jsonPath("$.dataValidade").value(DEFAULT_DATA_VALIDADE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCraf() throws Exception {
        // Get the craf
        restCrafMockMvc.perform(get("/api/crafs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCraf() throws Exception {
        // Initialize the database
        crafRepository.saveAndFlush(craf);

        int databaseSizeBeforeUpdate = crafRepository.findAll().size();

        // Update the craf
        Craf updatedCraf = crafRepository.findById(craf.getId()).get();
        // Disconnect from session so that the updates on updatedCraf are not directly saved in db
        em.detach(updatedCraf);
        updatedCraf
            .numero(UPDATED_NUMERO)
            .dataEmissao(UPDATED_DATA_EMISSAO)
            .dataValidade(UPDATED_DATA_VALIDADE);

        restCrafMockMvc.perform(put("/api/crafs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCraf)))
            .andExpect(status().isOk());

        // Validate the Craf in the database
        List<Craf> crafList = crafRepository.findAll();
        assertThat(crafList).hasSize(databaseSizeBeforeUpdate);
        Craf testCraf = crafList.get(crafList.size() - 1);
        assertThat(testCraf.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testCraf.getDataEmissao()).isEqualTo(UPDATED_DATA_EMISSAO);
        assertThat(testCraf.getDataValidade()).isEqualTo(UPDATED_DATA_VALIDADE);
    }

    @Test
    @Transactional
    public void updateNonExistingCraf() throws Exception {
        int databaseSizeBeforeUpdate = crafRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCrafMockMvc.perform(put("/api/crafs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(craf)))
            .andExpect(status().isBadRequest());

        // Validate the Craf in the database
        List<Craf> crafList = crafRepository.findAll();
        assertThat(crafList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCraf() throws Exception {
        // Initialize the database
        crafRepository.saveAndFlush(craf);

        int databaseSizeBeforeDelete = crafRepository.findAll().size();

        // Delete the craf
        restCrafMockMvc.perform(delete("/api/crafs/{id}", craf.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Craf> crafList = crafRepository.findAll();
        assertThat(crafList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
