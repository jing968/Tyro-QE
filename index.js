// Import sub testing functions
const products = require("./endpoint_test/products_test");
const productsDetail = require("./endpoint_test/productDetails_test");
// Import configs
const CONFIG = require("./config");

// main function to run the test
async function main() {
  await products.Run();
  await productsDetail.Run();
  CONFIG.testReport();
}

main();
