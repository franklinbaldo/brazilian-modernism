Feature: Notification Organism
  As a user
  I want to see application-level feedback in a consistent format
  So that I know the result of my actions without my flow being interrupted

  Scenario: Displaying different types of notifications
    Given the Notification component is rendered
    Then it should display informative feedback
    And it should adapt visually to its intent (info, tip, warning, danger)
    And it should be accessible and announce itself to screen readers

  Scenario: Dismissing notifications
    Given the Notification component is rendered with a close button
    When the user clicks the close button
    Then the notification should be dismissed
    And it should disappear with a smooth exit transition

  Scenario: Auto-dismissing notifications with adjustable timing
    Given the Notification is rendered with a timeout
    Then it should automatically dismiss after the timeout expires
    When the user hovers over or focuses the notification
    Then the timeout should be paused
    When the user stops hovering or removes focus
    Then the timeout should resume
