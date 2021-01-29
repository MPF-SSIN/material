package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.SsinApp;
import br.mp.mpf.ssin.domain.Calibre;
import br.mp.mpf.ssin.repository.CalibreRepository;

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
 * Integration tests for the {@link CalibreResource} REST controller.
 */
@SpringBootTest(classes = SsinApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CalibreResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private CalibreRepository calibreRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCalibreMockMvc;

    private Calibre calibre;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Calibre createEntity(EntityManager em) {
        Calibre calibre = new Calibre()
            .nome(DEFAULT_NOME);
        return calibre;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Calibre createUpdatedEntity(EntityManager em) {
        Calibre calibre = new Calibre()
            .nome(UPDATED_NOME);
        return calibre;
    }

    @BeforeEach
    public void initTest() {
        calibre = createEntity(em);
    }

    @Test
    @Transactional
    public void createCalibre() throws Exception {
        int databaseSizeBeforeCreate = calibreRepository.findAll().size();
        // Create the Calibre
        restCalibreMockMvc.perform(post("/api/calibres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(calibre)))
            .andExpect(status().isCreated());

        // Validate the Calibre in the database
        List<Calibre> calibreList = calibreRepository.findAll();
        assertThat(calibreList).hasSize(databaseSizeBeforeCreate + 1);
        Calibre testCalibre = calibreList.get(calibreList.size() - 1);
        assertThat(testCalibre.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createCalibreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = calibreRepository.findAll().size();

        // Create the Calibre with an existing ID
        calibre.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCalibreMockMvc.perform(post("/api/calibres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(calibre)))
            .andExpect(status().isBadRequest());

        // Validate the Calibre in the database
        List<Calibre> calibreList = calibreRepository.findAll();
        assertThat(calibreList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = calibreRepository.findAll().size();
        // set the field null
        calibre.setNome(null);

        // Create the Calibre, which fails.


        restCalibreMockMvc.perform(post("/api/calibres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(calibre)))
            .andExpect(status().isBadRequest());

        List<Calibre> calibreList = calibreRepository.findAll();
        assertThat(calibreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCalibres() throws Exception {
        // Initialize the database
        calibreRepository.saveAndFlush(calibre);

        // Get all the calibreList
        restCalibreMockMvc.perform(get("/api/calibres?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(calibre.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getCalibre() throws Exception {
        // Initialize the database
        calibreRepository.saveAndFlush(calibre);

        // Get the calibre
        restCalibreMockMvc.perform(get("/api/calibres/{id}", calibre.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(calibre.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingCalibre() throws Exception {
        // Get the calibre
        restCalibreMockMvc.perform(get("/api/calibres/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCalibre() throws Exception {
        // Initialize the database
        calibreRepository.saveAndFlush(calibre);

        int databaseSizeBeforeUpdate = calibreRepository.findAll().size();

        // Update the calibre
        Calibre updatedCalibre = calibreRepository.findById(calibre.getId()).get();
        // Disconnect from session so that the updates on updatedCalibre are not directly saved in db
        em.detach(updatedCalibre);
        updatedCalibre
            .nome(UPDATED_NOME);

        restCalibreMockMvc.perform(put("/api/calibres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCalibre)))
            .andExpect(status().isOk());

        // Validate the Calibre in the database
        List<Calibre> calibreList = calibreRepository.findAll();
        assertThat(calibreList).hasSize(databaseSizeBeforeUpdate);
        Calibre testCalibre = calibreList.get(calibreList.size() - 1);
        assertThat(testCalibre.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingCalibre() throws Exception {
        int databaseSizeBeforeUpdate = calibreRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCalibreMockMvc.perform(put("/api/calibres")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(calibre)))
            .andExpect(status().isBadRequest());

        // Validate the Calibre in the database
        List<Calibre> calibreList = calibreRepository.findAll();
        assertThat(calibreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCalibre() throws Exception {
        // Initialize the database
        calibreRepository.saveAndFlush(calibre);

        int databaseSizeBeforeDelete = calibreRepository.findAll().size();

        // Delete the calibre
        restCalibreMockMvc.perform(delete("/api/calibres/{id}", calibre.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Calibre> calibreList = calibreRepository.findAll();
        assertThat(calibreList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
