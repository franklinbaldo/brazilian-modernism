Feature: Composition Wall
  As a design system architect
  I want a compositional layout demonstrating "never the same wall twice"
  So that I can verify the integration of complex organisms like DataTables, DatePickers, and TimePickers on the Vitrine

  Scenario: Vitrine Composition Page Visual Governance
    Given the visual regression test suite
    When I create a composition page at `/cobogo/composition`
    Then the page should include complex interactive organisms like `FilterBar`, `DatePicker`, `TimePicker`, and `DataTable`
    And the layout should be tested for visual regressions at mobile, tablet, and desktop viewports
