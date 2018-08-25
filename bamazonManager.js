var mysql = require("mysql");
var inquirer = require("inquirer");
var action = "";
var currentProducts = [];
var allProductInfo = [];
var ammount = "";
var itemPicked = "";
var stockQuantity = "";
var adjustedQuantity = "";

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("###############   BAMAZON MANAGER PAGE   ###############");
    console.log("");
    console.log("");
    console.log("Now logged in as employee  " + connection.threadId + ".");
    console.log("");
    console.log("");
    connection.query("SELECT * FROM products" , function (err , res){
        if (err) throw err;
        for (var i = 0 ; i < res.length ; i++){
            currentProducts.push(res[i].product_name);
        };
    });
    initialPrompt();
});

function initialPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select the action you would like to do...",
            name: "action",
            choices: ["View products for sale", "View low inventory", "Add to current inventory", "Add new product"]
        }
    ]).then(function (response) {
        action = response.action;
        if (action === "View products for sale") {
            console.log("....   PULLING PRODUCT INFORMATION   ....");
            console.log("");
            console.log("");
            displayProducts();
        }
        else if (action === "View low inventory") {
            console.log("....   PULLING LOW INVENTORY   ....");
            console.log("");
            console.log("");
            lowInventory();
        }
        else if (action === "Add to current inventory") {
            console.log("....   PREPARING TO ADD STOCK   ....");
            console.log("");
            console.log("");
            addStockInq();
        }
        else if (action === "Add new product"){
            console.log("....   PREPARING TO ADD NEW PRODUCT   ....");
            console.log("");
            console.log("");
            addProduct();
        }

    });
};

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("===============   PRODUCTS AVAILABLE   ===============");
        console.log("");
        console.log("");
        currentProducts = [];
        allProductInfo = res;
        for (var i = 0; i < res.length; i++) {
            console.log("ITEM " + res[i].item_id + ": " + res[i].product_name);
            console.log("");
            console.log("Department: " + res[i].department_name);
            console.log("Price: $" + res[i].price);
            console.log("Stock: " + res[i].stock_quantity);
            console.log("");
            console.log("");
        };
        console.log("======================================================");
        console.log("");
        console.log("");
        whatElse();
    });
};

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        if (err) throw err;
        console.log("===============   !   LOW STOCK   !   ===============");
        console.log("");
        console.log("");
        for (var i = 0; i < res.length; i++) {
            console.log("ITEM " + res[i].item_id + ": " + res[i].product_name);
            console.log("");
            console.log("Department: " + res[i].department_name);
            console.log("Price: $" + res[i].price);
            console.log("Stock: " + res[i].stock_quantity);
            console.log("");
            console.log("");
        };
        console.log("======================================================");
        console.log("");
        console.log("");
        whatElse();
    });
};

function addStockInq() {
    inquirer.prompt([
        {
            type: "list",
            name: "pickProduct",
            choices: currentProducts,
            message: "Which product would you like to add stock to?"
        },
        {
            type: "input",
            name: "stockAmmount",
            message: "How many units are you adding?"
        }
    ]).then(function (response) {
        ammount = parseInt(response.stockAmmount);
        itemPicked = response.pickProduct;
        connection.query("SELECT stock_quantity FROM products WHERE product_name = ?", [itemPicked], function (err, res) {
            stockQuantity = parseInt(res[0].stock_quantity);
            console.log("");
            console.log("");
            addStock();
        });
        
    });
};

function addStock(){
    adjustedQuantity = stockQuantity + ammount;
    connection.query("UPDATE products SET ? WHERE ?" , 
[
    {
        stock_quantity: adjustedQuantity
    },
    {
        product_name: itemPicked
    }
],
function(err , res){
    if (err) throw err;
    console.log("....   !   ADDED " + ammount + " UNIT(S) TO " + itemPicked.toUpperCase() + "   !   ....");
    console.log("");
    console.log("....   TOTAL UNIT(S) = " + adjustedQuantity + "   ....");
    console.log("");
    console.log("");
    whatElse();
});
};

function addProduct(){
    inquirer.prompt([
        {
            type: "input",
            name:"addProdName",
            message: "NAME OF PRODUCT: "
        },
        {
            type: "input",
            name:"addProdDept",
            message: "DEPARTMENT NAME: "
        },
        {
            type: "input",
            name:"addProdPrice",
            message: "PRICE: "
        },
        {
            type: "input",
            name:"addProdUnits",
            message: "UNITS: "
        },
    ]).then(function(response){
        var productName = response.addProdName;
        var department = response.addProdDept;
        var prodPrice = response.addProdPrice;
        var addUnits = response.addProdUnits;

        connection.query("INSERT INTO products SET ?" ,
    {
        product_name: productName,
        department_name: department,
        price: prodPrice,
        stock_quantity: addUnits
    },
function(err , res){
    if(err) throw err;
    console.log("");
    console.log("");
    console.log("....   PRODUCT ADDED   ....");
    console.log("");
    console.log("");
    console.log("===============   "+ productName +"   ===============");
        console.log("");
        console.log("");
        console.log("");
        console.log("Department: " + department);
        console.log("Price: $" + prodPrice);
        console.log("Stock: " + addUnits);
        console.log("");
        console.log("");
        console.log("======================================================");
        console.log("");
        console.log("");
        currentProducts.push(productName);
        whatElse();
});
    });
    
};

function whatElse() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "again",
            message: "Would you like to do something else?",
        }
    ]).then(function (response) {
        if (response.again === true) {
            console.log("");
            console.log("");
            initialPrompt();
        }
        else {
            console.log("");
            console.log("");
            console.log("##########   LOGGING OUT ...   ##########");
            connection.end();
        };
    });
};