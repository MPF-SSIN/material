package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.SsinApp;
import br.mp.mpf.ssin.domain.TipoArma;
import br.mp.mpf.ssin.repository.TipoArmaRepository;

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
 * Integration tests for the {@link TipoArmaResource} REST controller.
 */
@SpringBootTest(classes = SsinApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoArmaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private TipoArmaRepository tipoArmaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoArmaMockMvc;

    private TipoArma tipoArma;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoArma createEntity(EntityManager em) {
        TipoArma tipoArma = new TipoArma()
            .nome(DEFAULT_NOME);
        return tipoArma;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoArma createUpdatedEntity(EntityManager em) {
        TipoArma tipoArma = new TipoArma()
            .nome(UPDATED_NOME);
        return tipoArma;
    }

    @BeforeEach
    public void initTest() {
        tipoArma = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoArma() throws Exception {
        int databaseSizeBeforeCreate = tipoArmaRepository.findAll().size();
        // Create the TipoArma
        restTipoArmaMockMvc.perform(post("/api/tipo-armas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoArma)))
            .andExpect(status().isCreated());

        // Validate the TipoArma in the database
        List<TipoArma> tipoArmaList = tipoArmaRepository.findAll();
        assertThat(tipoArmaList).hasSize(databaseSizeBeforeCreate + 1);
        TipoArma testTipoArma = tipoArmaList.get(tipoArmaList.size() - 1);
        assertThat(testTipoArma.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createTipoArmaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoArmaRepository.findAll().size();

        // Create the TipoArma with an existing ID
        tipoArma.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoArmaMockMvc.perform(post("/api/tipo-armas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoArma)))
            .andExpect(status().isBadRequest());

        // Validate the TipoArma in the database
        List<TipoArma> tipoArmaList = tipoArmaRepository.findAll();
        assertThat(tipoArmaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoArmaRepository.findAll().size();
        // set the field null
        tipoArma.setNome(null);

        // Create the TipoArma, which fails.


        restTipoArmaMockMvc.perform(post("/api/tipo-armas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoArma)))
            .andExpect(status().isBadRequest());

        List<TipoArma> tipoArmaList = tipoArmaRepository.findAll();
        assertThat(tipoArmaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTipoArmas() throws Exception {
        // Initialize the database
        tipoArmaRepository.saveAndFlush(tipoArma);

        // Get all the tipoArmaList
        restTipoArmaMockMvc.perform(get("/api/tipo-armas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoArma.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getTipoArma() throws Exception {
        // Initialize the database
        tipoArmaRepository.saveAndFlush(tipoArma);

        // Get the tipoArma
        restTipoArmaMockMvc.perform(get("/api/tipo-armas/{id}", tipoArma.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoArma.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingTipoArma() throws Exception {
        // Get the tipoArma
        restTipoArmaMockMvc.perform(get("/api/tipo-armas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoArma() throws Exception {
        // Initialize the database
        tipoArmaRepository.saveAndFlush(tipoArma);

        int databaseSizeBeforeUpdate = tipoArmaRepository.findAll().size();

        // Update the tipoArma
        TipoArma updatedTipoArma = tipoArmaRepository.findById(tipoArma.getId()).get();
        // Disconnect from session so that the updates on updatedTipoArma are not directly saved in db
        em.detach(updatedTipoArma);
        updatedTipoArma
            .nome(UPDATED_NOME);

        restTipoArmaMockMvc.perform(put("/api/tipo-armas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoArma)))
            .andExpect(status().isOk());

        // Validate the TipoArma in the database
        List<TipoArma> tipoArmaList = tipoArmaRepository.findAll();
        assertThat(tipoArmaList).hasSize(databaseSizeBeforeUpdate);
        TipoArma testTipoArma = tipoArmaList.get(tipoArmaList.size() - 1);
        assertThat(testTipoArma.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoArma() throws Exception {
        int databaseSizeBeforeUpdate = tipoArmaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoArmaMockMvc.perform(put("/api/tipo-armas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoArma)))
            .andExpect(status().isBadRequest());

        // Validate the TipoArma in the database
        List<TipoArma> tipoArmaList = tipoArmaRepository.findAll();
        assertThat(tipoArmaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoArma() throws Exception {
        // Initialize the database
        tipoArmaRepository.saveAndFlush(tipoArma);

        int databaseSizeBeforeDelete = tipoArmaRepository.findAll().size();

        // Delete the tipoArma
        restTipoArmaMockMvc.perform(delete("/api/tipo-armas/{id}", tipoArma.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoArma> tipoArmaList = tipoArmaRepository.findAll();
        assertThat(tipoArmaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
