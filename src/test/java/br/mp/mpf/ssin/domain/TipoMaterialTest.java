package br.mp.mpf.ssin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.mp.mpf.ssin.web.rest.TestUtil;

public class TipoMaterialTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoMaterial.class);
        TipoMaterial tipoMaterial1 = new TipoMaterial();
        tipoMaterial1.setId(1L);
        TipoMaterial tipoMaterial2 = new TipoMaterial();
        tipoMaterial2.setId(tipoMaterial1.getId());
        assertThat(tipoMaterial1).isEqualTo(tipoMaterial2);
        tipoMaterial2.setId(2L);
        assertThat(tipoMaterial1).isNotEqualTo(tipoMaterial2);
        tipoMaterial1.setId(null);
        assertThat(tipoMaterial1).isNotEqualTo(tipoMaterial2);
    }
}
