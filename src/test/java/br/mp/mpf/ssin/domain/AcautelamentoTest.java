package br.mp.mpf.ssin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.mp.mpf.ssin.web.rest.TestUtil;

public class AcautelamentoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Acautelamento.class);
        Acautelamento acautelamento1 = new Acautelamento();
        acautelamento1.setId(1L);
        Acautelamento acautelamento2 = new Acautelamento();
        acautelamento2.setId(acautelamento1.getId());
        assertThat(acautelamento1).isEqualTo(acautelamento2);
        acautelamento2.setId(2L);
        assertThat(acautelamento1).isNotEqualTo(acautelamento2);
        acautelamento1.setId(null);
        assertThat(acautelamento1).isNotEqualTo(acautelamento2);
    }
}
