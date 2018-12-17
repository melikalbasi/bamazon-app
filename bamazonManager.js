var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

// on connection display
connection.connect(function (err) {
  if (err) throw err;
  managerPrompt();
})

function managerPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "Hello Manager! What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
      }
    ]).then(function (answers) {
      var managerAction = answers.action;

      switch (managerAction) {
        case "View Products for Sale":
          viewInventory();
          break;
        case "View Low Inventory":
          viewLowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Product":
          addNewProduct();
          break;
      };

      function viewInventory() {
        connection.query(
          "SELECT * FROM products", function (err, res) {
            if (err) throw err;
      
            console.table(res);
        
          })
      }


      function viewLowInventory() {
        
      }


      function addInventory() {
        
      }


      function addNewProduct() {
        console.log("\nPlease fill out the following form to add a new product:\n")
        inquirer
          .prompt([
            {
              type: "input",
              name: "productName",
              message: "Enter name of item you would like to add: \n"
            },
            {
              type: "input",
              name: "deptName",
              message: "Department item belongs to: \n"
            },
            {
              type: "input",
              name: "cost",
              message: "Item cost: \n"
            },
            {
              type: "input",
              name: "stock",
              message: "Stock quantity: \n"
            }
          ]).then(function(answers) {
            connection.query(
              "INSERT INTO products SET ?",
              {
                product_name: answers.productName,
                department_name: answers.deptName,
                price: answers.cost,
                stock_quantity: answers.stock
              },
              function(err, res) {
                if (err) throw err;
                console.log("\nYour inventory has been updated!\n");
                viewInventory();
                managerPrompt();
              }
            )

          })
      }

    })
}
