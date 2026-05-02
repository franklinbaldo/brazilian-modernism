Feature: DatePicker Form Component
  As a user filling out a form
  I want a date picker component that allows me to select a date
  So that I can input temporal data accurately and accessibly

  Scenario: Basic rendering and interaction
    Given a DatePicker component with a bound value
    When I click the input field
    Then a calendar popover should appear displaying the current month
    And when I click a specific date
    Then the popover should close
    And the bound value should be updated to the selected date string (YYYY-MM-DD)

  Scenario: FormField validation integration
    Given a DatePicker nested inside a FormField component with an error state
    Then the input field should display an invalid state background color (var(--vermelho-soft))
    And the input field should have aria-invalid set to true

  Scenario: Keyboard navigation
    Given an open DatePicker calendar popover
    When I press the Escape key
    Then the popover should close
    And focus should return to the date input field
