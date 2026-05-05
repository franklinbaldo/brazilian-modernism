Feature: DateRangePicker Organism
  As a design system architect
  I want a DateRangePicker organism composed of two DatePicker molecules
  So that I can select a date range within the Curva & Concreto aesthetic

  Scenario: Basic implementation
    Given I render a DateRangePicker
    Then it should contain two DatePickers (start and end)
    And it should enforce that the end date cannot be before the start date
    And it should integrate with FormField context

  Scenario: Validation States
    Given a DateRangePicker within a FormField context
    When the FormField context is invalid
    Then both internal DatePicker inputs should adopt invalid styling

  Scenario: Size and Disabled States
    Given a DateRangePicker is provided a size prop or disabled prop
    Then the props should be forwarded correctly to both internal DatePickers
