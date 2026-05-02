Feature: FileInput component
  As a developer
  I want to use a standard COBOGÓ FileInput component
  So that users can upload files consistently, observing the Curva & Concreto aesthetic and error state patterns.

  Scenario: Render a FileInput
    Given the component is a FileInput
    When it renders
    Then it should behave visually like a FormField with atomic input structure
    And properly indicate invalid states with a background-color shift to var(--vermelho-soft)
    And it should style the file selector button consistently with the design system
