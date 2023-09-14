const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());
("use strict");

const cors = require("cors");
// REPLACE WITH STRIPE PRIVATE API KEY
const stripe = require("stripe")(
  "sk_test_4eC39HqLyjWDarjtT1zdp7dc"
);
const AWS = require("aws-sdk");
const S3 = new AWS.S3();

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/default/create-payment-intent", async (req, res) => {
  const cartItems = req.body;
  const priceById = require("./priceById.json");
  let totalCost = 0;

  cartItems.forEach((cartItems) => {
    const id = cartItems.id;
    for (let i = 0; i < priceById.length; i++) {
      if (priceById[i].id == id) {
        totalCost += priceById[i].price * cartItems.amount;
      }
    }
  });
  totalCost = totalCost * 100;
  totalCost = (Math.round(totalCost * 100) / 100).toFixed(0);
  console.log(totalCost);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
