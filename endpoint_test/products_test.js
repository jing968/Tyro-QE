// Import axios to make API calls
const axios = require("axios");
// Import configs
const CONFIG = require("../config");

// Test for the /banking/products endpoint

// Case where header x-v is not provided returns 400
const MissingXV = async () => {
  console.log("Sending request without x-v header");
  console.log("Expected: 400");
  try {
    await axios.get(CONFIG.PRODUCT_URL, CONFIG.AXIOS_CONFIG);
    console.log("Received: 200");
    CONFIG.checkPassed(400, 200);
  } catch (err) {
    console.log("Received: " + err.response.status);
    CONFIG.checkPassed(400, err.response.status);
    //if (err.response.status === 400) console.log("Err code 400 received");
    // console.log(err.response.data);
  }
};

// Case where x-v header is provided with an invalid number returns 400
const InvalidXV = async () => {
  console.log("Sending request with invalid x-v value");
  console.log("Expected: 400");
  try {
    await axios.get(CONFIG.PRODUCT_URL, {
      headers: { "Content-Type": "applications/json", "x-v": "1.1" },
    });
    console.log("Received: 200");
    CONFIG.checkPassed(400, 200);
  } catch (err) {
    console.log("Received: " + err.response.status);
    CONFIG.checkPassed(400, err.response.status);
    //if (err.response.status === 400) console.log("Err code 400 received");
    //console.log(err.response.status);
    //console.log(err.response.data);
  }
};

// Case where parameters were given in lower case;
const LowercaseParam = async () => {
  console.log("Sending request with lower cased parameter value");
  console.log("Expected: 400");
  try {
    const url = CONFIG.PRODUCT_URL + "?effective=all";
    const res = await axios.get(url, {
      headers: { "Content-Type": "applications/json", "x-v": "1" },
    });
    console.log("Received: 200");
    CONFIG.checkPassed(400, 200);
  } catch (err) {
    console.log("Received: " + err.response.status);
    CONFIG.checkPassed(400, err.response.status);
    //console.log(err.response.data);
  }
};

// Case where page parameter is invalid (negative number);
const InvalidParam = async () => {
  console.log("Sending request with invalid page value");
  console.log("Expected: 400");
  try {
    const url = CONFIG.PRODUCT_URL + "?page=-1?";
    const res = await axios.get(url, {
      headers: { "Content-Type": "applications/json", "x-v": "1" },
    });
    console.log("Received: 200");
    CONFIG.checkPassed(400, 200);
  } catch (err) {
    console.log("Received: " + err.response.status);
    CONFIG.checkPassed(400, err.response.status);
    //console.log(err.response.data);
  }
};

// Case where page-size parameters is invalid (zero);
const InvalidParam1 = async () => {
  console.log("Sending request with invalid page-size value");
  console.log("Expected: 400");
  try {
    const url = CONFIG.PRODUCT_URL + "?page-size=0?";
    await axios.get(url, {
      headers: { "Content-Type": "applications/json", "x-v": "1" },
    });
    console.log("Received: 200");
    CONFIG.checkPassed(400, 200);
  } catch (err) {
    console.log("Received: " + err.response.status);
    CONFIG.checkPassed(400, err.response.status);
    //console.log(err.response.data);
  }
};

// Case where page-size parameters is invalid (zero);
const InvalidParam2 = async () => {
  console.log("Sending request with invalid product-category value");
  console.log("Expected: 400");
  try {
    const url = CONFIG.PRODUCT_URL + "?product-category=abc";
    const res = await axios.get(url, {
      headers: { "Content-Type": "applications/json", "x-v": "1" },
    });
    console.log("Received: 200");
    CONFIG.checkPassed(400, 200);
  } catch (err) {
    console.log("Received: " + err.response.status);
    CONFIG.checkPassed(400, err.response.status);
    //console.log(err.response.data);
  }
};

// Case where all x-v header is provided with an valid number
const Success = async () => {
  console.log("Testing happy path");
  try {
    const res = await axios.get(CONFIG.PRODUCT_URL, {
      headers: { "Content-Type": "applications/json", "x-v": "1" },
    });
    const products = res.data.data.products;
    console.log("Products offered by Tyro payments are:");
    var count = 1;
    products.forEach((product) => {
      console.log(`${count}: ${product.name}`);
      count++;
    });
    console.log("Deposits options offfered by Tyro are:");
    count = 1;
    products.forEach((product) => {
      const keyword = "Term Deposit";
      const productName = product.name;
      if (productName.toLowerCase().includes(keyword.toLowerCase())) {
        console.log(`${count}: ${product.name}`);
        count++;
      }
    });
    CONFIG.checkPassed(200, 200);
  } catch (err) {
    CONFIG.checkPassed(200, err.response.status);
    console.log(err.response.status);
    console.log(err.response.data);
  }
};

// Function to run all the test above
const Run = async () => {
  console.log("-------Start of /banking/product test-------- \n");
  await MissingXV();
  CONFIG.LINE_BREAK();
  await InvalidXV();
  CONFIG.LINE_BREAK();
  await LowercaseParam();
  CONFIG.LINE_BREAK();
  await InvalidParam();
  CONFIG.LINE_BREAK();
  await InvalidParam1();
  CONFIG.LINE_BREAK();
  await InvalidParam2();
  CONFIG.LINE_BREAK();
  await Success();
  console.log("\n-------End of /banking/product test--------\n");
};

module.exports = { Run };
