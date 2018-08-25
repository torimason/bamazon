# Bamazon Node.js App

The function of this app is to simulate a user interface for a "store" where the customer can view and purchase goods, and a manager can view, update, and add goods.

## Files

* bamazonCustomer.js

* bamazonManager.js

* bamazonDBSeed.sql

* Images (Screenshots of app working)

## Dependencies

* Packages
    *inquirer (https://www.npmjs.   com/package/inquirer)
    *mysql (https://www.npmjs.com/package/mysql)

* Apps
    *MySQL WorkBench

## Step By Step (For each JS File)

### Bamazon Customer JS

1. Displays available products available for purchase (name, price)

1. Prompts customer to select a product they would like to purchase (list)

1. Confirms that they selected correct product

1. Checks stock

    1. If stock = 0, the user will be alerted it is sold out and redirected back to product selection.

    1. If there is available stock, the user will then be prompted to select how many they want to purchase (list created from # of units available)

1. Confirms quanitity

1. Updates Stock ammount based on how many user purchases

1. Initiates Checkout, displays product and total to user, asks if they would like to make another purchase.

    1. If yes, they will be directed back to initial question.

    1. If no, connection closes.

### Bamazon Manager JS

1. Prompts user to select an action

    1. If user selects to "View products for sale" then the available products will display. They will then be asked if they want to do something else, or log out.

    1. If user selects to "View low inventory" then the products with inventory ammounts less than 5 will display. They will then be asked if they want to do something else, or log out.

    1. If user selects "Add to current inventory" then they will be prompted to select a product from the list of available products to add units to.

        1. The user will then be prompted to select how many units they are adding.

        1. The stock ammount will be updated, and the user will be alerted ofthe change and the new total ammount of units for that item. 

        1. They will then be asked if they want to do something else, or log out.

    1. If the user selects "Add new product" then they will be prompted to input the item name, department, price, and stock quantity.

        1. The new information will be added to the database and then the new item info will display.

        1. They will then be asked if they want to do something else, or log out.

    1. Once they are prompted to ask if they want to do something else...

        1. If yes, they will be redirected to the initial prompt.

        1. If no, the server will close.



