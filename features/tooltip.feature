Feature: Tooltip Accessibility (WCAG 1.4.13)
  As a keyboard user
  I want to open and close tooltips using standard keyboard navigation
  So that I can access extra information without relying on a mouse and dismiss it when it blocks my view

  Scenario: Dismissing a tooltip with Escape
    Given a tooltip is visible because its trigger is focused
    When I press the "Escape" key
    Then the tooltip should be hidden
    And the focus should remain on the trigger element
