Feature: Vitrine Form Elements Documentation
  As a maintainer of the COBOGÓ design system
  I want all foundational form components to have dedicated MDX documentation pages in the vitrine
  So that consumers know how to compose and use them correctly, including their validation states

  Scenario: Form elements are documented
    When I navigate to the component documentation in the vitrine
    Then I should find a dedicated page for "Checkbox"
    And I should find a dedicated page for "Radio"
    And I should find a dedicated page for "Switch"
    And the documentation should include interactive examples demonstrating valid and invalid states
