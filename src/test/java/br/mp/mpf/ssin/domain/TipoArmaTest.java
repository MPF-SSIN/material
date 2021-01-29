package br.mp.mpf.ssin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.mp.mpf.ssin.web.rest.TestUtil;

public class TipoArmaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoArma.class);
        TipoArma tipoArma1 = new TipoArma();
        tipoArma1.setId(1L);
        TipoArma tipoArma2 = new TipoArma();
        tipoArma2.setId(tipoArma1.getId());
        assertThat(tipoArma1).isEqualTo(tipoArma2);
        tipoArma2.setId(2L);
        assertThat(tipoArma1).isNotEqualTo(tipoArma2);
        tipoArma1.setId(null);
        assertThat(tipoArma1).isNotEqualTo(tipoArma2);
    }
}
