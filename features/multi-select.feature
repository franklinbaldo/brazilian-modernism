Feature: MultiSelect organism
  As a user interacting with a complex form
  I want a MultiSelect component
  So that I can select and remove multiple items from a dropdown list efficiently

  Scenario: Render an empty MultiSelect
    Given a list of options
    When the MultiSelect is rendered
    Then it should display the placeholder
    And no options should be selected

  Scenario: Toggling the dropdown
    Given a MultiSelect component
    When the user clicks the trigger
    Then the dropdown should open and display options
    When the user clicks outside or presses Escape
    Then the dropdown should close

  Scenario: Selecting an option
    Given an open MultiSelect
    When the user selects an option
    Then the option should appear as a badge in the input area
    And the component's value should update

  Scenario: Removing a selected option
    Given a MultiSelect with a selected option
    When the user clicks the remove button on the badge
    Then the option should be removed from the selected items
    And the component's value should update

  Scenario: Filtering options
    Given a searchable MultiSelect
    When the user types into the input
    Then the options list should filter to match the typed text
