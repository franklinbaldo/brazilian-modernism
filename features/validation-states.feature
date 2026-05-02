Feature: Data Entry Validation States
  In order to provide unmistakable feedback adhering to the Curva & Concreto aesthetic
  As a user interacting with data entry components
  I want to see consistent invalid and valid states utilizing the correct colors across all form inputs

  Background:
    Given I have form components (TextInput, Select, Checkbox, Radio, Switch)

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
