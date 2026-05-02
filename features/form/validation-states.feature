Feature: Form validation states
  As a user interacting with forms
  I want to see clear, unmistakable feedback for invalid states
  So that I know when there's an error according to the Curva & Concreto aesthetic

  Scenario: TextInput displays invalid styling
    Given a TextInput component
    When the invalid prop is set to true
    Then it should have the invalid CSS class
    And it should have aria-invalid set to true

  Scenario: Select displays invalid styling
    Given a Select component
    When the invalid prop is set to true
    Then it should have the invalid CSS class
    And it should have aria-invalid set to true

  Scenario: TextInput inherits invalid state from FormField context
    Given a TextInput component inside a FormField
    When the FormField context has invalid set to true
    Then the TextInput should have the invalid CSS class
    And the TextInput should have aria-invalid set to true

  Scenario: Select inherits invalid state from FormField context
    Given a Select component inside a FormField
    When the FormField context has invalid set to true
    Then the Select should have the invalid CSS class
    And the Select should have aria-invalid set to true

  Scenario: Checkbox displays invalid and valid styling
    Given a Checkbox component
    When the invalid prop is set to true
    Then it should have the invalid CSS class
    When the valid prop is set to true
    Then it should have the valid CSS class

  Scenario: Radio displays invalid and valid styling
    Given a Radio component
    When the invalid prop is set to true
    Then it should have the invalid CSS class
    When the valid prop is set to true
    Then it should have the valid CSS class

  Scenario: Switch displays invalid and valid styling
    Given a Switch component
    When the invalid prop is set to true
    Then it should have the invalid CSS class
    When the valid prop is set to true
    Then it should have the valid CSS class

  Scenario: OptionGroup propagates validation states to children
    Given an OptionGroup with error
    Then the nested Radio and Checkbox inputs should receive the invalid context and display invalid styling
