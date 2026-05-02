Feature: Vitrine Organism Documentation
  As a maintainer of the COBOGÓ design system
  I want all complex organisms to have dedicated MDX documentation pages in the vitrine
  So that consumers know how to compose and use them correctly

  Scenario: Modal organisms are documented
    Given the design system exposes modal organisms like Dialog and Drawer
    When I navigate to the component documentation in the vitrine
    Then I should find a dedicated page for "Dialog"
    And I should find a dedicated page for "Drawer"
    And the documentation should include interactive examples
    And the documentation should explain focus trapping compliance with WCAG 2.1.2
