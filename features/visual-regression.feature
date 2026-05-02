Feature: Visual Regression Testing Harness
  As a maintainer of the COBOGÓ design system
  I want a robust visual regression testing harness
  So that I can programmatically ensure UI components remain visually consistent and avoid unintended regressions

  Scenario Outline: Visual screenshots are generated for components across viewports
    Given the design system has multiple core components
    When the visual regression test runs for a <component> in <viewport>
    Then it should capture a screenshot of the component in that viewport

    Examples:
      | component    | viewport |
      | alert        | mobile   |
      | alert        | tablet   |
      | alert        | desktop  |
      | badge        | mobile   |
      | button       | desktop  |
      | card         | mobile   |
      | data-table   | tablet   |
      | dialog       | desktop  |
      | filter-bar   | mobile   |
      | timeline     | tablet   |
      | tooltip      | desktop  |
