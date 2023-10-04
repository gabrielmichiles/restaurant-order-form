# Restaurant Order Application

Welcome to the Restaurant Order Application! This application allows customers to submit orders to a restaurant through a form. It retrieves dishes from a database and renders them on the client side.

You can access the deployed application [here](https://two600-goliveiramichi00.onrender.com).

## Getting Started

Follow these steps to get started with the application:

1. Run `npm install` to install the required dependencies.
2. Run `npm run dev` to start the server.
3. Access the application through the specified port number (e.g., `localhost:8080`).

## Features

Here are some of the key features of this application:

1. **Thorough Validation:** We've implemented thorough validation using Mongoose schemas, including the use of 'match' and 'validate' functions.

2. **Pre-save Hook:** We've used a pre-save hook in the Mongoose Order schema to calculate the 'total' property based on values imported from the Dish schema.

3. **Async Form Submission:** The function handling form submissions is asynchronous and handles asynchronous events inside it. We've implemented the use of the `Promise.all` method to retrieve all selected dishes before sending the POST request.

4. **Form Validation Errors:** We use an array of objects to store form validation errors as a state. This is also implemented inside the async form submission function.

## Instructions

To create an order, follow these steps:

1. Enter your name, which should be between 2 and 100 characters.
2. Enter your phone number, which should be between 10 and 25 characters and accepts different phone formats.
3. Enter your address, which should be between 5 and 140 characters.
4. Select at least 1 dish from the list.
5. Click the "Submit Order" button.

Feel free to explore and use this application to submit orders to the restaurant. If you encounter any issues or have any questions, please don't hesitate to reach out.

Thank you for using our Restaurant Order Application!
