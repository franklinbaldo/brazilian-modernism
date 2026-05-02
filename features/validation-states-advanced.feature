Feature: Advanced Form Controls Validation States
  In order to provide unmistakable feedback adhering to the Curva & Concreto aesthetic
  As a user interacting with advanced data entry components
  I want to see consistent invalid and valid states utilizing the correct colors across MultiSelect, Combobox, DatePicker, FileInput, and TimePicker

  Background:
    Given I have advanced form components (MultiSelect, Combobox, DatePicker, FileInput, TimePicker)

  Scenario: Invalid state presentation
    When the component is marked as invalid
    Then it should use "--vermelho-soft" for the background state where applicable
    And it should use "--vermelho" for borders, text, and focus outlines
    And it should properly link to FormField wrapper via Svelte context

  Scenario: Valid state presentation
    When the component is marked as valid
    Then it should use "--verde-soft" for the background state where applicable
    And it should use "--verde" for borders, text, and focus outlines
    And it should properly link to FormField wrapper via Svelte context
