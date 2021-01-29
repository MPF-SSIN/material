package br.mp.mpf.ssin.web.rest;

import br.mp.mpf.ssin.SsinApp;
import br.mp.mpf.ssin.domain.Acautelamento;
import br.mp.mpf.ssin.repository.AcautelamentoRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AcautelamentoResource} REST controller.
 */
@SpringBootTest(classes = SsinApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AcautelamentoResourceIT {

    private static final String DEFAULT_NUMERO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATA_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATA_HORA_DEVOLUCAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_HORA_DEVOLUCAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_OBS = "AAAAAAAAAA";
    private static final String UPDATED_OBS = "BBBBBBBBBB";

    @Autowired
    private AcautelamentoRepository acautelamentoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAcautelamentoMockMvc;

    private Acautelamento acautelamento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Acautelamento createEntity(EntityManager em) {
        Acautelamento acautelamento = new Acautelamento()
            .numero(DEFAULT_NUMERO)
            .dataHora(DEFAULT_DATA_HORA)
            .dataHoraDevolucao(DEFAULT_DATA_HORA_DEVOLUCAO)
            .obs(DEFAULT_OBS);
        return acautelamento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Acautelamento createUpdatedEntity(EntityManager em) {
        Acautelamento acautelamento = new Acautelamento()
            .numero(UPDATED_NUMERO)
            .dataHora(UPDATED_DATA_HORA)
            .dataHoraDevolucao(UPDATED_DATA_HORA_DEVOLUCAO)
            .obs(UPDATED_OBS);
        return acautelamento;
    }

    @BeforeEach
    public void initTest() {
        acautelamento = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcautelamento() throws Exception {
        int databaseSizeBeforeCreate = acautelamentoRepository.findAll().size();
        // Create the Acautelamento
        restAcautelamentoMockMvc.perform(post("/api/acautelamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acautelamento)))
            .andExpect(status().isCreated());

        // Validate the Acautelamento in the database
        List<Acautelamento> acautelamentoList = acautelamentoRepository.findAll();
        assertThat(acautelamentoList).hasSize(databaseSizeBeforeCreate + 1);
        Acautelamento testAcautelamento = acautelamentoList.get(acautelamentoList.size() - 1);
        assertThat(testAcautelamento.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testAcautelamento.getDataHora()).isEqualTo(DEFAULT_DATA_HORA);
        assertThat(testAcautelamento.getDataHoraDevolucao()).isEqualTo(DEFAULT_DATA_HORA_DEVOLUCAO);
        assertThat(testAcautelamento.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    public void createAcautelamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acautelamentoRepository.findAll().size();

        // Create the Acautelamento with an existing ID
        acautelamento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcautelamentoMockMvc.perform(post("/api/acautelamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acautelamento)))
            .andExpect(status().isBadRequest());

        // Validate the Acautelamento in the database
        List<Acautelamento> acautelamentoList = acautelamentoRepository.findAll();
        assertThat(acautelamentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNumeroIsRequired() throws Exception {
        int databaseSizeBeforeTest = acautelamentoRepository.findAll().size();
        // set the field null
        acautelamento.setNumero(null);

        // Create the Acautelamento, which fails.


        restAcautelamentoMockMvc.perform(post("/api/acautelamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acautelamento)))
            .andExpect(status().isBadRequest());

        List<Acautelamento> acautelamentoList = acautelamentoRepository.findAll();
        assertThat(acautelamentoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDataHoraIsRequired() throws Exception {
        int databaseSizeBeforeTest = acautelamentoRepository.findAll().size();
        // set the field null
        acautelamento.setDataHora(null);

        // Create the Acautelamento, which fails.


        restAcautelamentoMockMvc.perform(post("/api/acautelamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acautelamento)))
            .andExpect(status().isBadRequest());

        List<Acautelamento> acautelamentoList = acautelamentoRepository.findAll();
        assertThat(acautelamentoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAcautelamentos() throws Exception {
        // Initialize the database
        acautelamentoRepository.saveAndFlush(acautelamento);

        // Get all the acautelamentoList
        restAcautelamentoMockMvc.perform(get("/api/acautelamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(acautelamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].dataHora").value(hasItem(DEFAULT_DATA_HORA.toString())))
            .andExpect(jsonPath("$.[*].dataHoraDevolucao").value(hasItem(DEFAULT_DATA_HORA_DEVOLUCAO.toString())))
            .andExpect(jsonPath("$.[*].obs").value(hasItem(DEFAULT_OBS)));
    }
    
    @Test
    @Transactional
    public void getAcautelamento() throws Exception {
        // Initialize the database
        acautelamentoRepository.saveAndFlush(acautelamento);

        // Get the acautelamento
        restAcautelamentoMockMvc.perform(get("/api/acautelamentos/{id}", acautelamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(acautelamento.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.dataHora").value(DEFAULT_DATA_HORA.toString()))
            .andExpect(jsonPath("$.dataHoraDevolucao").value(DEFAULT_DATA_HORA_DEVOLUCAO.toString()))
            .andExpect(jsonPath("$.obs").value(DEFAULT_OBS));
    }
    @Test
    @Transactional
    public void getNonExistingAcautelamento() throws Exception {
        // Get the acautelamento
        restAcautelamentoMockMvc.perform(get("/api/acautelamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcautelamento() throws Exception {
        // Initialize the database
        acautelamentoRepository.saveAndFlush(acautelamento);

        int databaseSizeBeforeUpdate = acautelamentoRepository.findAll().size();

        // Update the acautelamento
        Acautelamento updatedAcautelamento = acautelamentoRepository.findById(acautelamento.getId()).get();
        // Disconnect from session so that the updates on updatedAcautelamento are not directly saved in db
        em.detach(updatedAcautelamento);
        updatedAcautelamento
            .numero(UPDATED_NUMERO)
            .dataHora(UPDATED_DATA_HORA)
            .dataHoraDevolucao(UPDATED_DATA_HORA_DEVOLUCAO)
            .obs(UPDATED_OBS);

        restAcautelamentoMockMvc.perform(put("/api/acautelamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAcautelamento)))
            .andExpect(status().isOk());

        // Validate the Acautelamento in the database
        List<Acautelamento> acautelamentoList = acautelamentoRepository.findAll();
        assertThat(acautelamentoList).hasSize(databaseSizeBeforeUpdate);
        Acautelamento testAcautelamento = acautelamentoList.get(acautelamentoList.size() - 1);
        assertThat(testAcautelamento.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testAcautelamento.getDataHora()).isEqualTo(UPDATED_DATA_HORA);
        assertThat(testAcautelamento.getDataHoraDevolucao()).isEqualTo(UPDATED_DATA_HORA_DEVOLUCAO);
        assertThat(testAcautelamento.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    public void updateNonExistingAcautelamento() throws Exception {
        int databaseSizeBeforeUpdate = acautelamentoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcautelamentoMockMvc.perform(put("/api/acautelamentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(acautelamento)))
            .andExpect(status().isBadRequest());

        // Validate the Acautelamento in the database
        List<Acautelamento> acautelamentoList = acautelamentoRepository.findAll();
        assertThat(acautelamentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAcautelamento() throws Exception {
        // Initialize the database
        acautelamentoRepository.saveAndFlush(acautelamento);

        int databaseSizeBeforeDelete = acautelamentoRepository.findAll().size();

        // Delete the acautelamento
        restAcautelamentoMockMvc.perform(delete("/api/acautelamentos/{id}", acautelamento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Acautelamento> acautelamentoList = acautelamentoRepository.findAll();
        assertThat(acautelamentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
