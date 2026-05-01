Feature: Form Wrapper Component
  As a user interacting with complex data entry interfaces
  I want a semantic Form wrapper component
  So that I can group related inputs, handle submissions natively, and manage macro-level fieldset validation according to the Curva & Concreto doctrine.

  Scenario: Basic native form submission
    Given a Form component with action and method
    When a user submits the form
    Then it should trigger the native submit event
    And it should allow custom onsubmit handlers
    And it should prevent default submission if requested

  Scenario: Fieldset grouping
    Given a Form component with a nested fieldset and legend
    When the Form is rendered
    Then it should visually group the nested FormFields
    And it should provide accessible grouping via the legend

  Scenario: Form-level validation state
    Given a Form component
    When multiple inputs inside the form have invalid states
    Then the Form should provide a unified error summary or visual cue
