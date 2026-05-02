Feature: Form Controls Dark Mode and Validation States

  As a user interacting with form elements
  I want the input validation states (invalid and valid) to remain highly visible in both light and dark modes
  So that I can confidently understand the status of my input regardless of my system preference

  Scenario: Form components display invalid states correctly in dark mode
    Given a form element (TextInput, Select, Checkbox, Radio, Switch) is rendered with the "invalid" prop
    When the user switches the application to dark mode
    Then the element's border should be "var(--vermelho)"
    And the element's background should invert to the dark mode "var(--vermelho-soft)" value
    And the element's focus outline should remain "var(--vermelho)"

  Scenario: Form components display valid states correctly in dark mode
    Given a form element (TextInput, Select, Checkbox, Radio, Switch) is rendered with the "valid" prop
    When the user switches the application to dark mode
    Then the element's border should be "var(--verde)"
    And the element's background should invert to the dark mode "var(--verde-soft)" value
    And the element's focus outline should remain "var(--verde)"

  Scenario: FormField context propagates both valid and invalid states
    Given a "FormField" wrapper is used
    When the "error" prop is provided
    Then child form inputs should receive the invalid context and display invalid styling
    When the "valid" prop is provided (with a success message)
    Then child form inputs should receive the valid context and display valid styling
