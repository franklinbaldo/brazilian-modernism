Feature: Data Entry Validation States
  As a user filling out a form
  I want unmistakable visual feedback when my input is invalid
  So that I can quickly identify and correct errors

  Scenario: Text input invalid state
    Given a TextInput component
    When the input is marked as invalid
    Then it should have a "--vermelho-soft" background
    And it should have a "--vermelho" border
    And its text color should be "--vermelho"
    And its focus ring should be "--vermelho"
    And it should be linked to its FormField wrapper via Svelte context

  Scenario: Select invalid state
    Given a Select component
    When the select is marked as invalid
    Then it should have a "--vermelho-soft" background
    And it should have a "--vermelho" border
    And its selected text color should be "--vermelho"
    And its background dropdown arrow should be colored "--vermelho"
    And its focus ring should be "--vermelho"
    And it should be linked to its FormField wrapper via Svelte context
