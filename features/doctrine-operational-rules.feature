Feature: Doctrine Operational Rules
  As a design system architect
  I want the Brazilian modernist canon to constrain code
  So that the composition wall enforces "modularity that breathes" via the Grid component

  Scenario: Grid structural integrity
    Given the composition wall is rendered at "/cobogo/composition"
    When I inspect the DOM for structural layout
    Then a ".cobogo-grid" element must exist
    And the grid gap must be "32px"
