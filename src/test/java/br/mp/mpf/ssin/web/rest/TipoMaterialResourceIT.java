package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.SsinApp;
import br.mp.mpf.ssin.domain.TipoMaterial;
import br.mp.mpf.ssin.repository.TipoMaterialRepository;

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
 * Integration tests for the {@link TipoMaterialResource} REST controller.
 */
@SpringBootTest(classes = SsinApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TipoMaterialResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private TipoMaterialRepository tipoMaterialRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTipoMaterialMockMvc;

    private TipoMaterial tipoMaterial;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoMaterial createEntity(EntityManager em) {
        TipoMaterial tipoMaterial = new TipoMaterial()
            .nome(DEFAULT_NOME);
        return tipoMaterial;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoMaterial createUpdatedEntity(EntityManager em) {
        TipoMaterial tipoMaterial = new TipoMaterial()
            .nome(UPDATED_NOME);
        return tipoMaterial;
    }

    @BeforeEach
    public void initTest() {
        tipoMaterial = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoMaterial() throws Exception {
        int databaseSizeBeforeCreate = tipoMaterialRepository.findAll().size();
        // Create the TipoMaterial
        restTipoMaterialMockMvc.perform(post("/api/tipo-materials")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoMaterial)))
            .andExpect(status().isCreated());

        // Validate the TipoMaterial in the database
        List<TipoMaterial> tipoMaterialList = tipoMaterialRepository.findAll();
        assertThat(tipoMaterialList).hasSize(databaseSizeBeforeCreate + 1);
        TipoMaterial testTipoMaterial = tipoMaterialList.get(tipoMaterialList.size() - 1);
        assertThat(testTipoMaterial.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createTipoMaterialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoMaterialRepository.findAll().size();

        // Create the TipoMaterial with an existing ID
        tipoMaterial.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoMaterialMockMvc.perform(post("/api/tipo-materials")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoMaterial)))
            .andExpect(status().isBadRequest());

        // Validate the TipoMaterial in the database
        List<TipoMaterial> tipoMaterialList = tipoMaterialRepository.findAll();
        assertThat(tipoMaterialList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoMaterials() throws Exception {
        // Initialize the database
        tipoMaterialRepository.saveAndFlush(tipoMaterial);

        // Get all the tipoMaterialList
        restTipoMaterialMockMvc.perform(get("/api/tipo-materials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoMaterial.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getTipoMaterial() throws Exception {
        // Initialize the database
        tipoMaterialRepository.saveAndFlush(tipoMaterial);

        // Get the tipoMaterial
        restTipoMaterialMockMvc.perform(get("/api/tipo-materials/{id}", tipoMaterial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tipoMaterial.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingTipoMaterial() throws Exception {
        // Get the tipoMaterial
        restTipoMaterialMockMvc.perform(get("/api/tipo-materials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoMaterial() throws Exception {
        // Initialize the database
        tipoMaterialRepository.saveAndFlush(tipoMaterial);

        int databaseSizeBeforeUpdate = tipoMaterialRepository.findAll().size();

        // Update the tipoMaterial
        TipoMaterial updatedTipoMaterial = tipoMaterialRepository.findById(tipoMaterial.getId()).get();
        // Disconnect from session so that the updates on updatedTipoMaterial are not directly saved in db
        em.detach(updatedTipoMaterial);
        updatedTipoMaterial
            .nome(UPDATED_NOME);

        restTipoMaterialMockMvc.perform(put("/api/tipo-materials")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoMaterial)))
            .andExpect(status().isOk());

        // Validate the TipoMaterial in the database
        List<TipoMaterial> tipoMaterialList = tipoMaterialRepository.findAll();
        assertThat(tipoMaterialList).hasSize(databaseSizeBeforeUpdate);
        TipoMaterial testTipoMaterial = tipoMaterialList.get(tipoMaterialList.size() - 1);
        assertThat(testTipoMaterial.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoMaterial() throws Exception {
        int databaseSizeBeforeUpdate = tipoMaterialRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoMaterialMockMvc.perform(put("/api/tipo-materials")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tipoMaterial)))
            .andExpect(status().isBadRequest());

        // Validate the TipoMaterial in the database
        List<TipoMaterial> tipoMaterialList = tipoMaterialRepository.findAll();
        assertThat(tipoMaterialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoMaterial() throws Exception {
        // Initialize the database
        tipoMaterialRepository.saveAndFlush(tipoMaterial);

        int databaseSizeBeforeDelete = tipoMaterialRepository.findAll().size();

        // Delete the tipoMaterial
        restTipoMaterialMockMvc.perform(delete("/api/tipo-materials/{id}", tipoMaterial.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoMaterial> tipoMaterialList = tipoMaterialRepository.findAll();
        assertThat(tipoMaterialList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
