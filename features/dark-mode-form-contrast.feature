Feature: Form Elements Dark Mode Contrast
  As a user with visual impairments
  I want form inputs to have visible borders and focus rings in dark mode
  So that I can perceive the boundaries of the inputs and know when they are focused

  Scenario: Form inputs maintain WCAG non-text contrast in dark mode
    Given a form containing a TextInput, Select, MultiSelect, Checkbox, Radio, and Switch
    When dark mode is enabled
    Then the inputs should have a border with a contrast ratio of at least 3.0 against the background
    And when focused, the focus ring should have a contrast ratio of at least 3.0 against the background
