// Import axios to make API calls
const axios = require("axios");
// Import configs
const CONFIG = require("../config");

// Tests for /banking/products/{productId} endpoint
var ProductID;

// Case where header x-v is not provided
const MissingXV = async () => {
  console.log("Sending request without x-v header");
  console.log("Expected: 400");
  const url = CONFIG.PRODUCT_URL + "/" + ProductID;
  try {
    await axios.get(url, CONFIG.AXIOS_CONFIG);
    CONFIG.checkPassed(400, 200);
  } catch (err) {
    console.log("Received: " + err.response.status);
    CONFIG.checkPassed(400, err.response.status);
  }
};

// Case where header x-v is not provided wih invalid value
const InvalidXV = async () => {
  console.log("Sending request without x-v header");
  console.log("Expected: 400");
  const url = CONFIG.PRODUCT_URL + "/" + ProductID;
  try {
    await axios.get(url, {
      headers: { "Content-Type": "applications/json", "x-v": "1.1" },
    });
    CONFIG.checkPassed(400, 200);
  } catch (err) {
    console.log("Received: " + err.response.status);
    CONFIG.checkPassed(400, err.response.status);
  }
};

// Case where invalid id is provided in the query param
const InvaildParam = async () => {
  console.log("Sending request with invalid productId");
  console.log("Expected: 400");
  try {
    const url = CONFIG.PRODUCT_URL + "/123123";
    const res = await axios.get(url, {
      headers: { "Content-Type": "applications/json", "x-v": "1" },
    });
    CONFIG.checkPassed(400, 200);
  } catch (err) {
    console.error("Received: " + err.response.status);
    CONFIG.checkPassed(400, err.response.status);
  }
};

// Getting product ID of "Tyro Business Loan" product
const GetID = async () => {
  console.log("Testing happy path");
  console.log('Fetching productID for "Tyro Business Loan"');
  try {
    const url = CONFIG.PRODUCT_URL + "?product-category=BUSINESS_LOANS";
    const res = await axios.get(url, {
      headers: { "Content-Type": "applications/json", "x-v": "1" },
    });
    const products = res.data.data.products;
    products.forEach((product) => {
      if (product.name === "Tyro Business Loan") {
        ProductID = product.productId;
      }
    });
    console.log("Found: " + ProductID);
    CONFIG.checkPassed(200, 200);
  } catch {
    console.log("Unexpected Error encountered");
    CONFIG.checkPassed(200, err.response.status);
  }
};

// Getting product detail for "Tyro Business Loan"
const GetDetails = async () => {
  console.log('Fetching product details for "Tyro Business Loan"');
  try {
    const url = CONFIG.PRODUCT_URL + "/" + ProductID;
    const res = await axios.get(url, {
      headers: { "Content-Type": "applications/json", "x-v": "1" },
    });
    if (res.data.data.name !== "Tyro Business Loan")
      console.log("Error encountered");
    else {
      console.group("Eligibility are found to be the following:");
      res.data.data.eligibility.forEach((elem) => {
        console.log(`${elem.eligibilityType}: ${elem.additionalInfo}`);
      });
      console.groupEnd();
    }
    CONFIG.checkPassed(200, 200);
  } catch {
    console.log("Unexpected Error encountered");
    CONFIG.checkPassed(200, err.response.status);
  }
};

// Function to run all the test above
const Run = async () => {
  console.log("-----Start of /banking/product/{id} test------ \n");
  await GetID();
  CONFIG.LINE_BREAK();
  await GetDetails();
  CONFIG.LINE_BREAK();
  await InvaildParam();
  CONFIG.LINE_BREAK();
  await MissingXV();
  CONFIG.LINE_BREAK();
  await InvalidXV();
  console.log("\n-----End of /banking/product/{id} test------\n");
};

module.exports = { Run };
