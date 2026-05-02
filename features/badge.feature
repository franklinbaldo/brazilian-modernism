Feature: Badge component
  As a user scanning an interface
  I want to see succinct, visually distinct badges
  So that I can quickly understand the status or category of an item

  Scenario: Rendering the default badge
    Given a Badge component with text "Pendente"
    When the component renders
    Then it should display the text "Pendente"
    And it should have the default "azul" background styling

  Scenario: Rendering variant badges
    Given a Badge component with text "Confirmado" and variant "verde"
    When the component renders
    Then it should display the text "Confirmado"
    And it should have the "verde" background styling

  Scenario: Applying custom classes
    Given a Badge component with text "Destacado" and custom class "my-custom-class"
    When the component renders
    Then it should include "my-custom-class" in its class list
