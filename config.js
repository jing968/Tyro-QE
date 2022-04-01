// Config file
const PRODUCT_URL = "https://public.cdr.tyro.com/cds-au/v1/banking/products";
// https://api.cdr.tyro.com/cds-au/v1/banking/products
//"https://public.cdr.tyro.com/cds-au/v1/banking/products"
const AXIOS_CONFIG = {
  headers: { "Content-Type": "applications/json" },
};
const AXIOS_CONFIG_XV = {
  headers: {
    "Content-Type": "applications/json",
    "x-v": "1",
  },
};

var TestRan = 0;
var TestPassed = 0;
var TestFailed = 0;

const LINE_BREAK = () => {
  console.log("-----------------------------------");
};

const checkPassed = (expected, received) => {
  TestRan++;
  if (expected === received) {
    console.log("\x1b[32m%s\x1b[0m", "Test PASSED");
    TestPassed++;
  } else {
    console.log("\x1b[31m%s\x1b[0m", "Test FAILED");
    TestFailed++;
  }
};

const testReport = () => {
  console.log("All test completed");
  console.log(`Ran ${TestRan} tests`);
  console.log("Passed: " + TestPassed);
  console.log("Failed: " + TestFailed);
};

module.exports = {
  PRODUCT_URL,
  AXIOS_CONFIG,
  AXIOS_CONFIG_XV,
  LINE_BREAK,
  checkPassed,
  testReport,
};
