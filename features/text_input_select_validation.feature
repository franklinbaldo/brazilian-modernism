Feature: TextInput and Select Validation States
  In order to provide clear and accessible feedback to users
  As a user interacting with data entry forms
  I want TextInput and Select components to display unambiguous visual cues when in a valid or invalid state

  @planned
  Scenario: TextInput invalid state styling
    Given a TextInput component
    When the "invalid" prop is set to true
    Then the component should display a background of "--vermelho-soft"
    And the component should display text and borders of "--vermelho"
    And the component should have the "aria-invalid" attribute set to "true"

  @planned
  Scenario: TextInput valid state styling
    Given a TextInput component
    When the "valid" prop is set to true
    Then the component should display a background of "--verde-soft"
    And the component should display text and borders of "--verde"
    And the component should not have the "aria-invalid" attribute set to "true"

  @planned
  Scenario: Select invalid state styling
    Given a Select component
    When the "invalid" prop is set to true
    Then the component should display a background of "--vermelho-soft"
    And the component should display text and borders of "--vermelho"
    And the dropdown arrow icon should be styled with "--vermelho"
    And the component should have the "aria-invalid" attribute set to "true"

  @planned
  Scenario: Select valid state styling
    Given a Select component
    When the "valid" prop is set to true
    Then the component should display a background of "--verde-soft"
    And the component should display text and borders of "--verde"
    And the dropdown arrow icon should be styled with "--verde"
    And the component should not have the "aria-invalid" attribute set to "true"

  @planned
  Scenario: FormField context integration
    Given a FormField component wrapping a TextInput or Select
    When the FormField receives an "error" prop
    Then the wrapped input component should automatically assume an invalid state
    And it should be linked to the FormField's error message via "aria-describedby"
    When the FormField receives a "valid" prop instead
    Then the wrapped input component should automatically assume a valid state
