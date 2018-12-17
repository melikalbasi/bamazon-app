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
    .prompt[(
      {
        type: "list",
        name: "action",
        message: "Hello Manager! What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
      }
    )].then(function (answer) {
      var managerAction = answer.action;

      switch (action) {
        case "View Products for Sale":
          viewInventory();
          break;
        case "View Low Inventory":
          viewInventory();
          break;
        case "Add to Inventory":
          viewInventory();
          break;
        case "Add New Product":
          viewInventory();
          break;
      };

      if (managerAction = "View Products for Sale") {

      }


      if (managerAction = "View Low Inventory") {
        
      }


      if (managerAction = "Add to Inventory") {
        
      }


      if (managerAction = "Add New Product") {
        
      }


    })
}