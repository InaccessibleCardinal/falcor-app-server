// index.js
var falcor = require('falcor');
var falcorExpress = require('falcor-express');
var Router = require('falcor-router');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));

//create model
var $ref = falcor.Model.ref;
var model = new falcor.Model({
  cache: {
    productsById: {
      '11': {'name': 'Product 1', 'price': 59.99, 'inStock': true},
      '22': {'name': 'Product 2', 'price': 49.99, 'inStock': true},
      '33': {'name': 'Product 3', 'price': 69.99, 'inStock': true},
      '44': {'name': 'Product 4', 'price': 99.99, 'inStock': true}
    },
    categories: [
      {name: 'good', examples: [$ref('productsById["11"]'), $ref('productsById["44"]')]},
      {name: 'bad', examples: [$ref('productsById["22"]')]},
      {name: 'soSo', examples: [$ref('productsById["33"]')]}            
    ]
  }
});
/*
var router = new Router([
  {
    route: 'categories[{integers: indices}].name',
    get: function(pathSet) {
      //var pathvalues = []
      //code to build path values
      pathset.indices.forEach((index) => {
        //code to build path values
      })
    }
  }
])
*/
//get 3rd party data?
request('https://jsonplaceholder.typicode.com/users', (error, res) => {
  console.log('error? ', error);
  console.log(res);
});

app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  return model.asDataSource();
}));
 
// serve static files from current directory
app.use(express.static(__dirname + '/'));


var server = app.listen(8888, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('Server is running on http://localhost:8888');
});