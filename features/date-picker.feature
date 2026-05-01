Feature: DatePicker and TimePicker molecule components
  As a developer
  I want to use a standard COBOGÓ DatePicker and TimePicker component
  So that users can enter dates and times consistently, observing the Curva & Concreto aesthetic and error state patterns.

  Scenario: Render a DatePicker
    Given the component is a DatePicker
    When it renders
    Then it should behave visually like a FormField with atomic input structure
    And properly indicate invalid states with a background-color shift to var(--vermelho-soft)
