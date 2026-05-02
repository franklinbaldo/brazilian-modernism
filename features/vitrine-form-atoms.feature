Feature: Vitrine Form Atoms Documentation
  As a maintainer of the COBOGÓ design system
  I want all form atoms to have dedicated MDX documentation pages in the vitrine
  So that consumers know how to compose and use them correctly

  Scenario: Form atoms are documented
    Given the design system exposes form atoms like Checkbox, Radio, and Switch
    When I navigate to the component documentation in the vitrine
    Then I should find a dedicated page for "Checkbox"
    And I should find a dedicated page for "Radio"
    And I should find a dedicated page for "Switch"
    And the documentation should include interactive examples
    And the documentation should explain the validation states compliance with Curva & Concreto aesthetic
