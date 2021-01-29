package br.mp.mpf.ssin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.mp.mpf.ssin.web.rest.TestUtil;

public class CalibreTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Calibre.class);
        Calibre calibre1 = new Calibre();
        calibre1.setId(1L);
        Calibre calibre2 = new Calibre();
        calibre2.setId(calibre1.getId());
        assertThat(calibre1).isEqualTo(calibre2);
        calibre2.setId(2L);
        assertThat(calibre1).isNotEqualTo(calibre2);
        calibre1.setId(null);
        assertThat(calibre1).isNotEqualTo(calibre2);
    }
}
