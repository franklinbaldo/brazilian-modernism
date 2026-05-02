Feature: Keyboard focus trapping in overlays

  As a user relying on keyboard navigation
  I want overlays like Dialogs and Drawers to strictly trap my focus
  So that I don't accidentally interact with obscured content and lose my place.

  Scenario: Native dialog implementation provides implicit focus trapping
    Given a Dialog is opened
    Then the focus should be restricted to the interactive elements inside the dialog
    And pressing Tab from the last element should cycle focus back to the first element
    And pressing Shift+Tab from the first element should cycle focus to the last element

  Scenario: Drawer implements similar overlay focus semantics
    Given a Drawer is opened
    Then the focus should be appropriately restricted
