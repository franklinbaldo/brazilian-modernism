Feature: Focus Management and Trapping
  As a user relying on keyboard navigation or assistive technologies
  I want overlay organisms like Dialog and Drawer to trap focus inside them
  So that I don't accidentally navigate to background elements, violating WCAG 2.1.2

  Background:
    Given I have a page with a FocusTrap component wrapping a Dialog or Drawer

  Scenario: Tabbing cycles through elements inside the trap
    Given the Dialog is open
    When I press "Tab" repeatedly
    Then focus should cycle through the focusable elements inside the Dialog
    And focus should return to the first element after the last element

  Scenario: Shift+Tabbing cycles backwards through elements inside the trap
    Given the Dialog is open
    When I press "Shift+Tab" repeatedly
    Then focus should cycle backwards through the focusable elements inside the Dialog
    And focus should return to the last element after the first element

  Scenario: Focus is intercepted and pulled back if it escapes the trap
    Given the Dialog is open
    And I programmatically blur the active element so focus returns to the document body
    When I press "Tab"
    Then focus should be placed on the first focusable element inside the Dialog
    And focus should not leak to background elements

  Scenario: Reverse focus is intercepted and pulled back if it escapes the trap
    Given the Dialog is open
    And I programmatically blur the active element so focus returns to the document body
    When I press "Shift+Tab"
    Then focus should be placed on the last focusable element inside the Dialog
    And focus should not leak to background elements
