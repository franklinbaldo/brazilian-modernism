Feature: Dark mode contrast across layered organisms
  As a user navigating the COBOGÓ design system vitrine
  I want layered organisms like Dialog, Drawer, and Notification to respect dark mode
  So that their backgrounds invert properly while maintaining semantic legibility and contrast

  Scenario: Organisms invert backgrounds and maintain vibrant borders in dark mode
    Given a vitrine page rendering a Notification, a Dialog, and a Drawer
    When the dark mode is enabled on the document root
    Then the Dialog and Drawer should have a dark background (var(--papel-00) mapped to #1A1814)
    And the Drawer and Dialog text should be legible (var(--concreto-80) mapped to #DCD4BE)
    And the Notification (info intent) should have a soft dark background (var(--azul-soft) mapped to #1B2B4B)
    And the Notification should maintain its vibrant semantic accent color for borders
