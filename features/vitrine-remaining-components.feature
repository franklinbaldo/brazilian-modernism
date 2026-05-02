Feature: Vitrine Remaining Components Documentation
  As a maintainer of the COBOGÓ design system
  I want all remaining molecules and organisms to have dedicated MDX documentation pages in the vitrine
  So that consumers know how to compose and use them correctly

  Scenario: Remaining components are documented
    Given the design system exposes components like Pagination, Alert, Breadcrumbs, DataTable, FilterBar, and Timeline
    When I navigate to the component documentation in the vitrine
    Then I should find a dedicated page for "Pagination"
    And I should find a dedicated page for "Alert"
    And I should find a dedicated page for "Breadcrumbs"
    And I should find a dedicated page for "Button"
    And I should find a dedicated page for "Card"
    And I should find a dedicated page for "DataTable"
    And I should find a dedicated page for "FilterBar"
    And I should find a dedicated page for "Timeline"
    And the documentation should include interactive examples
