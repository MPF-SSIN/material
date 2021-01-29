package br.mp.mpf.ssin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.mp.mpf.ssin.web.rest.TestUtil;

public class CrafTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Craf.class);
        Craf craf1 = new Craf();
        craf1.setId(1L);
        Craf craf2 = new Craf();
        craf2.setId(craf1.getId());
        assertThat(craf1).isEqualTo(craf2);
        craf2.setId(2L);
        assertThat(craf1).isNotEqualTo(craf2);
        craf1.setId(null);
        assertThat(craf1).isNotEqualTo(craf2);
    }
}
