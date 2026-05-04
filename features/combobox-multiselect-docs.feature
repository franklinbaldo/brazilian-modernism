Feature: Combobox and MultiSelect Vitrine Documentation
  As a maintainer of the COBOGÓ design system
  I want Combobox and MultiSelect to have dedicated MDX documentation pages in the vitrine
  So that consumers know how to compose and use these complex interactive organisms correctly

  Scenario: Combobox and MultiSelect are documented
    When I navigate to the component documentation in the vitrine
    Then I should find a dedicated page for "Combobox"
    And I should find a dedicated page for "MultiSelect"
    And the documentation should include interactive examples demonstrating their usage
