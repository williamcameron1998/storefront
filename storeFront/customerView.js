var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'storefront'
});
connection.connect(function (err) {
	if (err) {
		console.error("error connecting: " + err.stack);
	};

	function validateInput(value) {
		var integer = Number.isInteger(parseFloat(value));
		var sign = Math.sign(value);

		if (integer && (sign === 1)) {
			return true;
		} else {
			return 'Please enter a valid integer.';
		}
	}

	function displayInventory() {
		queryStr = 'SELECT * FROM items';
		connection.query(queryStr, function (err, data) {
			if (err) throw err;
			console.log('Existing Inventory: ');
			console.log('...\n');
			var strOut = '';
			for (var i = 0; i < data.length; i++) {
				strOut = '';
				strOut += 'Item ID: ' + data[i].item_id + '  //  ';
				strOut += 'Product Name: ' + data[i].product_name + '  //  ';
				strOut += 'Category: ' + data[i].category_name + '  //  ';
				strOut += 'Price: $' + data[i].price + '\n';
				console.log(strOut);
			}
			console.log("---\n");
			promptUserPurchase();
		})

		function promptUserPurchase() {

			inquirer.prompt([
				{
					type: 'input',
					name: 'item_id',
					message: 'Please enter the Item ID which you would like to purchase.',
					validate: validateInput,
					filter: Number
},
				{
					type: 'input',
					name: 'quantity',
					message: 'How many do you need?',
					validate: validateInput,
					filter: Number
}
]).then(function (input) {
				var item = input.item_id;
				var quantity = input.quantity;
				var queryStr = 'SELECT * FROM items WHERE ?';
				connection.query(queryStr, {
					item_id: item
				}, function (err, data) {
					if (err) throw err;

					if (data.length === 0) {
						console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
						displayInventory();
					} else {
						var productData = data[0];
						if (quantity <= productData.stock_quantity) {
							console.log('Placed Order Successfuly');
							var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
					    connection.query(updateQueryStr, function (err, data) {
								if (err) throw err;

								console.log('Your oder has been placed' + productData.price * quantity);
								console.log('Thank you for shopping with us!');
								console.log("\n---\n");
								connection.end();
							})
						} else {
							console.log('Item is out of stock.');
							console.log('Please modify your order.');
							console.log("\n---\n");

							displayInventory();
						}
					}
				})
			})
		}
		function displayInventory() {
			queryStr = 'SELECT * FROM products';
			connection.query(queryStr, function (err, data) {
				if (err) throw err;

				console.log('Existing Inventory: ');
				console.log('...\n');

				var strOut = '';
				for (var i = 0; i < data.length; i++) {
					strOut = '';
					strOut += 'Item ID: ' + data[i].item_id + '  //  ';
					strOut += 'Product Name: ' + data[i].product_name + '  //  ';
					strOut += 'Category: ' + data[i].category_name + '  //  ';
					strOut += 'Price: $' + data[i].price + '\n';

					console.log(strOut);
				}
				console.log("---\n");
				promptUserPurchase();
			})
		}

		function runStorefront() {
		displayInventory();
		};
	}
});