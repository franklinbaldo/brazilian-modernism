Feature: MultiSelect component
  As a user interacting with a complex form organism
  I want to select multiple options from a dropdown
  So that I can assign several tags or categories to a field

  Scenario: Toggling the dropdown menu
    Given a MultiSelect component with options "A" and "B"
    When I click the trigger
    Then the dropdown menu is visible
    When I click the trigger again
    Then the dropdown menu is hidden

  Scenario: Selecting an option
    Given a MultiSelect component with options "A" and "B"
    When I click the trigger
    And I click the option "A"
    Then the option "A" is selected and visible as a badge

  Scenario: Removing an option
    Given a MultiSelect component with pre-selected option "A"
    When I click the remove button on the badge "A"
    Then the option "A" is no longer selected

  Scenario: Searching options
    Given a searchable MultiSelect component with options "Brasil" and "Argentina"
    When I type "Bra" in the search input
    Then the option "Brasil" is visible in the dropdown
    And the option "Argentina" is hidden

  Scenario: FormField context integration
    Given a MultiSelect component inside a FormField
    When the FormField has an error
    Then the MultiSelect trigger receives the invalid styling and aria-invalid true