Feature: Grid and Column fluid typography and responsive stacking
  As a user navigating the COBOGÓ design system vitrine
  I want the grid to adapt to different screen sizes and the typography to scale smoothly
  So that the layout remains legible and structurally sound across all devices

  Scenario: Typography scales via CSS clamp natively without media queries
    Given the global CSS defines fluid typography tokens across all scales (e.g., --t-h1, --t-h2, --t-h3, --t-h4, --t-display)
    When the viewport is resized
    Then the computed typography size should dynamically change depending on viewport width without relying on breakpoint conditions

  Scenario: Column stacking adapts based on breakpoint attributes
    Given a Grid contains a Column with multiple breakpoint span attributes (e.g., md=4, sm=6)
    When the viewport width is below 480px (mobile)
    Then the column should span the full 12 columns
    When the viewport is at desktop size
    Then the column should span its specified desktop width
