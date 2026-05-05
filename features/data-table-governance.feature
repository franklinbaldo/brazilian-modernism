Feature: DataTable Visual Governance and Accessibility
  As a design system architect
  I want the DataTable component to be visually accountable and accessible
  So that tabular data is presented with strict geometric constraint and remains fully navigable by all users

  Scenario: Adding DataTable to visual governance
    Given the DataTable component is documented in the Vitrine
    When I run the Playwright test suite for `DataTable`
    Then the table structure should render correctly at mobile, tablet, and desktop viewports
    And the table container must be keyboard focusable (`tabindex="0"`) to comply with WCAG 2.1.1 and 2.1.3 for horizontally scrollable regions
    And the component must pass automated accessibility checks via AxeBuilder
