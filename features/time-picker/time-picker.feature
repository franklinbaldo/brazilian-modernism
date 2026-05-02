Feature: TimePicker Form Component
  As a user filling out a form
  I want a time picker component that allows me to select a time
  So that I can input temporal data accurately and accessibly

  Scenario: Basic rendering and interaction
    Given a TimePicker component with a bound value
    When I click the input field
    Then a popover should appear displaying hours and minutes
    And when I select a specific hour and minute
    Then the bound value should be updated to the selected time string (HH:MM)

  Scenario: FormField validation integration
    Given a TimePicker nested inside a FormField component with an error state
    Then the input field should display an invalid state background color (var(--vermelho-soft))
    And the input field should have aria-invalid set to true

  Scenario: Keyboard navigation
    Given an open TimePicker popover
    When I press the Escape key
    Then the popover should close
    And focus should return to the time input field
