Feature: Tooltip WCAG 1.4.13 Compliance

  Scenario: Tooltip can be hovered over without closing
    Given a Tooltip component with "Hoverable content"
    When a user hovers over the trigger element
    Then the tooltip popup should be visible
    When the user moves the pointer from the trigger element directly to the tooltip popup
    Then the tooltip popup should remain visible
    And the user can interact with the tooltip content

  Scenario: Tooltip is dismissible via Escape key without losing focus
    Given a Tooltip component triggered by focus
    When a user focuses the trigger element
    Then the tooltip popup should be visible
    When the user presses the Escape key
    Then the tooltip popup should be hidden
    And the focus should remain on the trigger element
