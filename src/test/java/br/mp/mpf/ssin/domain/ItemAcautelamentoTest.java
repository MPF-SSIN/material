package br.mp.mpf.ssin.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.mp.mpf.ssin.web.rest.TestUtil;

public class ItemAcautelamentoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemAcautelamento.class);
        ItemAcautelamento itemAcautelamento1 = new ItemAcautelamento();
        itemAcautelamento1.setId(1L);
        ItemAcautelamento itemAcautelamento2 = new ItemAcautelamento();
        itemAcautelamento2.setId(itemAcautelamento1.getId());
        assertThat(itemAcautelamento1).isEqualTo(itemAcautelamento2);
        itemAcautelamento2.setId(2L);
        assertThat(itemAcautelamento1).isNotEqualTo(itemAcautelamento2);
        itemAcautelamento1.setId(null);
        assertThat(itemAcautelamento1).isNotEqualTo(itemAcautelamento2);
    }
}
