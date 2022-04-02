# Tyro-QE

Automated API testing for the tyro developer API endpoints /banking/products and /banking/products/{productId} using axios and JavaScript

# Usage

1. npm install to install the only package required to run the test.
2. Run `node index.js` at the root directory

## File Structures

`endpoint_test` folder contains test scripts for a specific endpoint
`config.js` file contains global varaible and utility functions used by test scripts
`index.js` file contains the function call to the actual test, npm start will run this file.

## Choice of language

As specified above, the assessment is completed with JavaScrirpt. There are several reason behind the choice of JavaScript.

1. JavaScript alongside Python TypeScript Ruby PHP etc are relatively more user friendly in the field of web development.
2. Out of the all the languages mentioned above, I only have expereince with JavaScript Python TypeScript and Ruby. And I have been using JavaScript as my main programming language for quite a while.
3. Although TypeScript is capable of enforing correctness of the code, I do not think it is necessary in this particular application, as the objects I will be comparing (e.g. status code for request, returned JSON object, string) are mostly straight-forward datatypes. Hence the choice of JavaScript

## Choice of framework

Although ranges of different API testing frameworks are widly available in the internet (e.g. Chakram, Frisby.js, PactumJS etc.). I wanted to implement the test script without the help of any framework. The use of framework can greatly reduce the work I need to put into the assessment, but it also take away my chance to demonstrate my ability.

## Assumptions

Assumptions made includes:

1. https://public.cdr.tyro.com/cds-au/v1/banking/products is correct API URL
2. v-x version: 1 is the correct version to use

## Findings

400 error code are mainly returned due to two reasones:

1. Missing http request header, the x-v header
2. malformed paramter in request header and / or parameter. For example, invalid page parameter for /banking/products endpoint, decimal value for x-v request header.
   Another thing I also found quite interesting is that when page parameter is set to negative number or zero, it returns 404 resource not found instead of 400 bad request.

Everything inside the repository is completed by Jing (Jacky) Deng
