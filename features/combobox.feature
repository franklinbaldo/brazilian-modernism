Feature: Combobox organism
  As a developer
  I want a Combobox component that combines a TextInput and an OptionGroup (or dropdown list)
  So that users can filter and select from a large list of options efficiently.

  Scenario: Render a basic Combobox
    Given a list of options
    When the Combobox is rendered
    Then it should display a TextInput
    And clicking the input should reveal the options list

  Scenario: Filtering options
    Given the Combobox is open with options
    When the user types into the input
    Then the options list should filter to match the typed text

  Scenario: Selecting an option
    Given the Combobox is open with options
    When the user selects an option
    Then the Combobox should close
    And the input should display the selected option's label
