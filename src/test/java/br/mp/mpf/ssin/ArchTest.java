package br.mp.mpf.ssin;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("br.mp.mpf.ssin");

        noClasses()
            .that()
            .resideInAnyPackage("br.mp.mpf.ssin.service..")
            .or()
            .resideInAnyPackage("br.mp.mpf.ssin.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..br.mp.mpf.ssin.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
