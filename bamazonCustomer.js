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
  console.log("======================================================================")
  console.log("         __")
  console.log("  _(\    |@@|")
  console.log(" (__/\__ \--/ __                   Welcome to Bamazon!")
  console.log("   \___|----|  |   __")
  console.log("       \ }{ /\ )_ / _\     You're just in time for the holidays!")
  console.log("       /\__/\ \__O (__")
  console.log("       (--/\--)   \__/         What would you like to order?")
  console.log("       _)(  )(_")
  console.log("      `---''---`")
  console.log("======================================================================")
  displayInventory();
})




// display inventory function
function displayInventory() {
  connection.query(
    "SELECT * FROM products", function (err, res) {
      if (err) throw err;

      console.table(res);

      inquirer
        .prompt([
          {
            type: "input",
            name: "itemID",
            message: "What is the ID of the item you would like to purchase?",
          },
          {
            type: "input",
            name: "itemNum",
            message: "How many would you like?",
          }
        ]).then(function (answers) {
          var userChoice = parseInt(answers.itemID);
          var itemQuantity = parseInt(answers.itemNum);
          var itemName;
          var currentInventory;
          var itemPrice;

          for (var i = 0; i < res.length; i++) {
            if (userChoice === res[i].item_id) {
              currentInventory = res[i].stock_quantity;
              itemPrice = res[i].price;
              itemName = res[i].product_name;
            }
          }

          // check to make sure valid ID was entered
          if (!currentInventory) {
            console.log("Sorry you entered an invalid number.")
            displayInventory();
          } else {
            // check to make sure we can handle the quantity they want to order.
            if (itemQuantity > currentInventory) {
              console.log("Sorry! We don't have enough stock.")
              displayInventory();
            } else {
              console.log("Proceeding to update inventory..");
              updateInventory(userChoice, itemQuantity, currentInventory, itemPrice, itemName);
            }
          }
        })
    })
}



// update inventory function
function updateInventory(userChoice, itemQuantity, currentInventory, itemPrice, itemName) {
  if (userChoice) {
    currentInventory -= itemQuantity;
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: currentInventory
        },
        {
          item_id: userChoice
        }
      ], function (err, res) {
        if (err) throw err;
        console.log("Processing your order... ");
        // console.log(res.affectedRows);
        displayTotalCost(userChoice, itemQuantity, itemPrice, itemName);
      }
    )
  }
}


// function to display total and follow up with prompting the user to order again or exit
function displayTotalCost(userChoice, itemQuantity, itemPrice, itemName) {
  connection.query(
    "SELECT * FROM products", function (err, res) {
      if (err) throw err;
      var totalCost;
      totalCost = itemPrice * itemQuantity;
      console.log("\nYour total for \n" + itemQuantity + "x " + itemName + " items \n" +
        "=======================\n" + "$" + totalCost.toFixed(2) + "\n");

      inquirer
        .prompt([
          {
            name: "order",
            type: "list",
            message: "Would you like to order again?",
            choices: ["Yes", "No"]
          }
        ]).then(function (answer) {
          var yesOrNo = answer.order;

          if (yesOrNo === "Yes") {
            displayInventory();
          } else {
            console.log("__________________________________________________________________\n")
            console.log("                         See you next time! \n   ")
            console.log("                              _    _      ")
            console.log("                             ( \---/ )    ");
            console.log("                              ) . . (    ");
            console.log("________________________,--._(___Y___)_,--._______________________");
            console.log("                        `--'           `--'      ");
            connection.end();
          }
        })

    });
}