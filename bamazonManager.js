var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
var Table = require('cli-table');

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
        connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {

          var table = new Table({
            head: ["ID", "Item", "Category", "Price", "Available"],
            colWidths: [10, 20, 15, 10, 10]
          });

          for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 3000) {
              table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity],
              );
            }
          }
          console.log("\nThese are all the items with less than 3000 units left in their inventory:")
          console.log(table.toString());
        })
      }





      function addInventory() {
        viewInventory();
        inquirer.prompt([{
          type: "input",
          name: "itemChoice",
          message: "\nPlease typie in the ID number of the item you would like to update: \n"
        }, {
          name: "updateAmount",
          message: "Amount to add to inventory: \n"
        }]).then(function (answers) {

          var itemChosen = answers.itemChoice
          connection.query("SELECT * FROM products", function (err, res) {

            function newQuantity() {
              for (var i = 0; i < res.length; i++) {
                if (itemChosen == res[i].item_id) {

                  return res[i].stock_quantity
                }
              }
            }

            var updateQuantity = newQuantity() + parseInt(answers.updateAmount)

            connection.query(
              "UPDATE products SET ? WHERE ?", [{
                stock_quantity: updateQuantity
              },
              {
                item_id: itemChosen
              }
              ],
              function (err, res) {
                console.log("\nItem inventory updated!:")

                viewInventory();
              }
            );
          })
        })

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
          ]).then(function (answers) {
            connection.query(
              "INSERT INTO products SET ?",
              {
                product_name: answers.productName,
                department_name: answers.deptName,
                price: answers.cost,
                stock_quantity: answers.stock
              },
              function (err, res) {
                if (err) throw err;
                console.log("\nYour inventory has been updated!\n");
                viewInventory();
                
              }  
            )
            
          })
      }

      // function askAgain() {
      //   inquirer
      //     .prompt([
      //       {
      //         type: "list",
      //         name: "again",
      //         message: "Is there anything else you would like to do?",
      //         choices: ["Yes", "No"]
      //       }
      //     ]).then(function(answers) {
      //       var userChoice = answers.again;

      //       if (userChoice = "Yes") {
      //         managerPrompt();
      //       } else {
      //         connection.end();
      //       }
      //     })
      // }

      

    })
}
