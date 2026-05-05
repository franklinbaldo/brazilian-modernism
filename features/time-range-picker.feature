Feature: TimeRangePicker Organism
  As a design system architect
  I want a TimeRangePicker organism composed of two TimePicker molecules
  So that I can select a time range within the Curva & Concreto aesthetic

  Scenario: Basic implementation
    Given I render a TimeRangePicker
    Then it should contain two TimePickers (start and end)
    And it should enforce that the end time cannot be before the start time
    And it should integrate with FormField context

  Scenario: Validation States
    Given a TimeRangePicker within a FormField context
    When the FormField context is invalid
    Then both internal TimePicker inputs should adopt invalid styling

  Scenario: Size and Disabled States
    Given a TimeRangePicker is provided a size prop or disabled prop
    Then the props should be forwarded correctly to both internal TimePickers
