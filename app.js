// get the puppeteer package
const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function go() {
  // launch browser
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
    defaultViewport: null
  });

  const page = await browser.newPage();

  //   access the site given by terminal argument
  await page.goto(
    process.argv[2]
  );

  // Product name
  const mydata = await page.$eval("#productTitle", (data) => {
    return data.innerText;
  });
  
  console.log('Product:', mydata);

  
  // Ratings
  const stars = await page.$eval('#acrPopover', (data) => {
    return data.title;
  });
  const reviews = await page.$eval('#acrCustomerReviewText', (data) => {
    return data.innerText;
  });
 
  console.log('Product rating:', `${stars} from a total of ${reviews}`);

  // Main image
  const img = await page.$eval('#imgTagWrapperId img', (data) => {
    return data.src;
  });

  console.log('Product\'s main picture URL is:', img);

  // Price
  const price = await page.$eval('.reinventPricePriceToPayMargin.priceToPay span', (data) => {
    return data.innerText;
  });
  console.log('Product price:', price);

  //   close the browser
  browser.close();
}

go();