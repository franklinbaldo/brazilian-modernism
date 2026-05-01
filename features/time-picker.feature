Feature: TimePicker component
  As a developer
  I want to use a standard COBOGÓ TimePicker component
  So that users can enter times consistently, observing the Curva & Concreto aesthetic and error state patterns.

  Scenario: Render a TimePicker
    Given the component is a TimePicker
    When it renders
    Then it should behave visually like a FormField with atomic input structure
    And properly indicate invalid states with a background-color shift to var(--vermelho-soft)
