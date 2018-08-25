var mysql = require("mysql");
var inquirer = require("inquirer");
var choices = [];
var userChoice = "";
var stockQuantity = ""
var quantityAvailable = [];
var userQuantity = "";
var pricePer = "";

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("###############   BAMAZON CUSTOMER PAGE   ###############");
    console.log("");
    console.log("");
    console.log("Welcome Customer " + connection.threadId + "!");
    console.log("");
    console.log("");
    displayProducts();
});

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("===============   PRODUCTS AVAILABLE   ===============");
        console.log("");
        console.log("");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].product_name.toUpperCase());
            console.log("");
            console.log("$" + res[i].price);
            console.log("");
            console.log("");
            choices.push(res[i].product_name);
        };
        console.log("======================================================");
        console.log("");
        console.log("");
        pickProduct();
    });
};

function pickProduct() {
    console.log("-----------   SELECT PRODUCT TO PURCHASE   -----------");
    console.log("");
    console.log("");
    inquirer.prompt([
        {
            type: "list",
            choices: choices,
            name: "productPicked",
            message: "What product would you like to purchase?"
        }
    ]).then(function (response) {
        userChoice = response.productPicked;
        console.log("");
        console.log("");
        pickProductConfirm();
    });
};

function pickProductConfirm() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "productConfirm",
            message: "Are you sure you want to purchase " + userChoice + "?",
            default: true
        }
    ]).then(function (response) {
        console.log("");
        console.log("");
        if (response.productConfirm === true) {
            console.log("....   GATHERING STOCK INFORMATION   ....");
            console.log("");
            console.log("");
            howMany();
        }
        else {
            console.log("....   REDIRECTING BACK TO PRODUCT SELECTION   ....");
            console.log("");
            console.log("");
            pickProduct();
        };
    });
};

function howMany() {
    connection.query("SELECT * FROM products WHERE product_name = ?", [userChoice], function (err, res) {
        if (res[0].stock_quantity === 0) {
            console.log("!!....   SOLD OUT   ....!!")
            console.log("");
            console.log("....   REDIRECTING BACK TO PRODUCT SELECTION   ....");
            console.log("");
            console.log("");
            pickProduct();
        }
        else {
            stockQuantity = res[0].stock_quantity;
            pricePer = res[0].price;
            selectQuantity();
        };
    });
};

function selectQuantity(){
            for (var i = 1; i < stockQuantity + 1; i++) {
                var number = i;
                var string = ' ' + number
                quantityAvailable.push(string);
            };
            console.log("----------   SELECT QUANTITY   ----------");
            console.log("");
            console.log("");
            inquirer.prompt([
                {
                    type: "list",
                    message: "Select a quantity ...",
                    choices: quantityAvailable,
                    name:"quantitySelection"
                }
            ]).then(function(response){
                userQuantity = response.quantitySelection;
                console.log("");
                console.log("");
                quantityConfirm();
            });
};

function quantityConfirm(){
    inquirer.prompt([
        {
            type: "confirm",
            name:"quantityConfirm",
            message: "Are you sure you want to buy" + userQuantity + " for $" + pricePer + " each?",
            default: true
        }
    ]).then(function(response){
        if(response.quantityConfirm === true){
            console.log("");
            console.log("");
            console.log("....   UPDATING STOCK   ....");
            console.log("");
            console.log("");
            updateStock();
        }
        else{
            console.log("");
            console.log("");
            console.log("....   REDIRECTING TO QUATITY SELECTION   ....");
            console.log("");
            console.log("");
            howMany();
        };
    });
};

function updateStock(){
    var updateQuantity = stockQuantity - userQuantity;
    connection.query("UPDATE products SET ? WHERE ?" , 
[
    {
        stock_quantity: updateQuantity
    },
    {
        product_name: userChoice
    }
],
function(err , res){
    
    console.log("....   STOCK UPDATED   ....");
    console.log("");
    console.log("");
    console.log("....   INITIALIZING CHECKOUT   ....");
    console.log("");
    console.log("");
    checkout();
});
};

function checkout(){
    console.log("----------   CHECKOUT   ----------");
    console.log("");
    console.log("");
    var userTotal = pricePer * userQuantity;
    inquirer.prompt([
        {
            type: "confirm",
            message: "Your total is $" + userTotal + ", would you like to shop again?",
            name: "checkoutConfirm",
            default: false
        }
    ]).then(function(response){
        console.log("");
        console.log("");
        if(response.checkoutConfirm === true){
            displayProducts();
        }
        else{
            console.log("###############   COME BACK SOON!   ###############")
            connection.end();
        };
    })
};
