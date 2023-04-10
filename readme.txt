Final Project Documentation

Restaurant Order Application
# This application allows customers to submit an order to a restaurant through a form.
# Dishes are retrieved from a database to be rendered on client. 


# Getting started:
  1. Run 'npm install' to install required dependencies;
  2. Run 'npm run dev' to start the server;
  3. Access the application through port number (e.g. localhost:8080);

# Features:
  1. Thorough validation implemented on Mongoose schemas, including use of 'match' and 'validate functions;
  2. Use of Pre-save hook in the Mongoose Order schema to implement the creation of the 'total' property based on the values imported from the Dish schema;
  3. Function to handle form submission is an async function that also handles asynchronous events inside it, implementing the use of the Promise.all method to retrieve all selected dishes before
  sending the POST request;
  4. Use of an array of objects to store form validation errors as a state, also implemented inside async form submission function;

# Instructions:
  - To create an order:
    1. Enter name, between 2 and 100 characters;
    2. Enter phone, between 10 and 25 characters - accepts a few different phone formats;
    3. Enter address, between 5 and 140 characters;
    4. Select at least 1 dish from the list;
    5. Submit order;

  - To create a dish:
    1. Send a POST request to the following endpoint '/api/v1/dishes' with a JSON object with the following structure:
      {
        "name": "Dish name between 2 and 100 characters",
        "description": "Dish description between 2 and 140 characters",
        "price": 5
        (price accepts a number between 1 and 999.99 - number can have up to 2 decimal places)
      }

# API Documentation:
  1. Dishes endpoints:
    1.1. POST /api/v1/dishes
      - Creates a new dish.

      - Expected body format:
      {
        "name": "Expanded Chorizo Discs",
        "description": "A portion of disc-shaped chorizos.",
        "price": 16.50
      }

      - Response format:
      {
        "name": "Expanded Chorizo Discs",
        "description": "A portion of disc-shaped chorizos.",
        "price": 16.5,
        "_id": "64336c7f14d52f788c4dbbe2",
        "__v": 0
      }
    
    1.2. GET /api/v1/dishes
      - Returns a list of all products.

      - Response format:
      [
        {
            "_id": "642f5cad7a6fd98f537f7bc6",
            "name": "Sunflower",
            "description": "A simple sunflower.",
            "price": 16,
            "__v": 0
        },
        {
            "_id": "642f5cfc7a6fd98f537f7bc8",
            "name": "Burnt Hazelnuts with Arugula Spread",
            "description": "Burn hazelnuts covered in arugula spread.",
            "price": 12,
            "__v": 0
        },
        {
            "_id": "642f5d537a6fd98f537f7bca",
            "name": "Fingerling Farfalle Tacos",
            "description": "A portion of small tacos filled with farfalle.",
            "price": 16.75,
            "__v": 0
        },
        {
            "_id": "642f5d937a6fd98f537f7bcc",
            "name": "Anchovy Waffle",
            "description": "Waffle covered in anchoves syrup.",
            "price": 13,
            "__v": 0
        },
        {
            "_id": "642f5dac7a6fd98f537f7bce",
            "name": "Fennel",
            "description": "A single fennel.",
            "price": 17,
            "__v": 0
        },
        {
            "_id": "643339c59e00a1227a5b8b42",
            "name": "Acorn",
            "description": "An acorn.",
            "price": 13,
            "__v": 0
        },
        {
            "_id": "64336c7f14d52f788c4dbbe2",
            "name": "Expanded Chorizo Discs",
            "description": "A portion of disc-shaped chorizos.",
            "price": 16.5,
            "__v": 0
        }
      ]

    1.3. GET /api/v1/dishes/:dishID
      - Returns a single dish with specified ID.

      - e.g. '/api/v1/dishes/64336c7f14d52f788c4dbbe2'

      - Response format:
        {
          "_id": "64336c7f14d52f788c4dbbe2",
          "name": "Expanded Chorizo Discs",
          "description": "A portion of disc-shaped chorizos.",
          "price": 16.5,
          "__v": 0
        }

  2. Orders endpoints:
    2.1. POST /api/v1/orders/
      - Creates a new order.

      - Expected body format:
      {
        "name" : "Gabriel",
        "phone": "123-456-7890",
        "address": "100 West 49th Avenue",
        "dishes": [
            {
                "name": "Fennel",
                "description": "A single fennel.",
                "price": 17
            },
            {
                "name": "Sunflower",
                "description": "A simple sunflower.",
                "price": 16
            }
        ]
      }

      - Response format:
      {
        "name": "Gabriel",
        "phone": "123-456-7890",
        "address": "100 West 49th Avenue",
        "dishes": [
            {
                "name": "Fennel",
                "description": "A single fennel.",
                "price": 17,
                "_id": "643379885d5d54d3b14630d3"
            },
            {
                "name": "Sunflower",
                "description": "A simple sunflower.",
                "price": 16,
                "_id": "643379885d5d54d3b14630d4"
            }
        ],
        "_id": "643379885d5d54d3b14630d2",
        "total": 33,
        "__v": 0
      }

    2.2. GET /api/v1/orders
      - Returns a list of all orders.

      - Response format:
          [
            {
                "_id": "642f5eba7a6fd98f537f7bd1",
                "name": "david",
                "phone": "123456321",
                "address": "100 W 49th Ave, Vancouver, BC",
                "dishes": [
                    {
                        "name": "Watermelon",
                        "price": 0,
                        "_id": "642f5eba7a6fd98f537f7bd2"
                    }
                ],
                "__v": 0
            },
            {
                "_id": "642fd33572424784c4bcd686",
                "name": "john",
                "phone": "+91 (123) 456-7890",
                "address": "at a different place",
                "dishes": [
                    {
                        "name": "Sunflower",
                        "description": "A simple sunflower.",
                        "price": 16,
                        "_id": "642fd33572424784c4bcd687"
                    },
                    {
                        "name": "Burnt Hazelnuts with Arugula Spread",
                        "description": "Burn hazelnuts covered in arugula spread.",
                        "price": 12,
                        "_id": "642fd33572424784c4bcd688"
                    },
                    {
                        "name": "Fennel",
                        "description": "A single fennel.",
                        "price": 17,
                        "_id": "642fd33572424784c4bcd689"
                    },
                    {
                        "name": "Fingerling Farfalle Tacos",
                        "description": "A portion of small tacos filled with farfalle.",
                        "price": 16.75,
                        "_id": "642fd33572424784c4bcd68a"
                    },
                    {
                        "name": "Anchovy Waffle",
                        "description": "Waffle covered in anchoves syrup.",
                        "price": 13,
                        "_id": "642fd33572424784c4bcd68b"
                    }
                ],
                "__v": 0
            },
            {
                "_id": "64328f0edb9fbe75af1d781a",
                "name": "gabriel o m",
                "phone": "778 123 4321",
                "address": "12345 vancouver",
                "dishes": [
                    {
                        "name": "Burnt Hazelnuts with Arugula Spread",
                        "description": "Burn hazelnuts covered in arugula spread.",
                        "price": 12,
                        "_id": "642f5cfc7a6fd98f537f7bc8",
                        "__v": 0
                    },
                    {
                        "name": "Fingerling Farfalle Tacos",
                        "description": "A portion of small tacos filled with farfalle.",
                        "price": 16.75,
                        "_id": "642f5d537a6fd98f537f7bca",
                        "__v": 0
                    },
                    {
                        "name": "Anchovy Waffle",
                        "description": "Waffle covered in anchoves syrup.",
                        "price": 13,
                        "_id": "642f5d937a6fd98f537f7bcc",
                        "__v": 0
                    },
                    {
                        "name": "Sunflower",
                        "description": "A simple sunflower.",
                        "price": 16,
                        "_id": "642f5cad7a6fd98f537f7bc6",
                        "__v": 0
                    }
                ],
                "total": 57.75,
                "__v": 0
            },
            {
                "_id": "643379885d5d54d3b14630d2",
                "name": "Gabriel",
                "phone": "123-456-7890",
                "address": "100 West 49th Avenue",
                "dishes": [
                    {
                        "name": "Fennel",
                        "description": "A single fennel.",
                        "price": 17,
                        "_id": "643379885d5d54d3b14630d3"
                    },
                    {
                        "name": "Sunflower",
                        "description": "A simple sunflower.",
                        "price": 16,
                        "_id": "643379885d5d54d3b14630d4"
                    }
                ],
                "total": 33,
                "__v": 0
            }
          ]

    2.3. GET /api/v1/orders/:orderID
      - Returns a single order with specified ID.

      - e.g. '/api/v1/dishes/643379885d5d54d3b14630d2'

      - Response format:
      {
        "_id": "643379885d5d54d3b14630d2",
        "name": "Gabriel",
        "phone": "123-456-7890",
        "address": "100 West 49th Avenue",
        "dishes": [
            {
                "name": "Fennel",
                "description": "A single fennel.",
                "price": 17,
                "_id": "643379885d5d54d3b14630d3"
            },
            {
                "name": "Sunflower",
                "description": "A simple sunflower.",
                "price": 16,
                "_id": "643379885d5d54d3b14630d4"
            }
        ],
        "total": 33,
        "__v": 0
      }

# References:
  - 'models/Dish.js' 
    -- line 21: (https://stackoverflow.com/questions/70531231/regular-expression-for-accepting-integers-decimal-values-and-limiting-by-maximu);
  
  - 'models/Order.js'
    -- line 16: (https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number);
    -- line 34: (https://github.com/Automattic/mongoose/issues/5139#issuecomment-429990002) and (https://mongoosejs.com/docs/validation.html#custom-error-messages)
    -- line 46: (https://mongoosejs.com/docs/middleware.html#pre) and (https://medium.com/@justinmanalad/pre-save-hooks-in-mongoose-js-cf1c0959dba2);

  - 'src/CreateOrder.js'
    -- line 20: (https://stackoverflow.com/a/54069332);
    -- lines 46 and 53: (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all);
    -- line 87: (https://blog.openreplay.com/integrating-axios-with-react-hooks/);

  - 'src/DisplayOrder.js'
    -- line 16: (https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd/63490548#63490548) and (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)

  - Dish names and prices from: (https://www.brooklynbarmenus.com);



  



