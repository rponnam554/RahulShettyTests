Feature: Login

  Scenario: Successful login and checkout

    Given I am on the login page
    When I login as SystemAdmin
    Then I should see the dashboard
    When I search and add the product
    And I go to the cart
    Then I should see the cart
    When I verify the cart and checkout
    And I go to the checkout
    Then I should see the checkout page
    When I verify the checkout
    And I go to order confirmation
    Then I should see the order confirmation
    When I verify the order confirmation