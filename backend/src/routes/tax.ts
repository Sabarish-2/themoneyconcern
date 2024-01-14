import * as TaxController from '../controllers/taxc';
import express from 'express';


// Short explanation for the code below:
// First we import the TaxController from the tax.ts file.
// Then we import the express library.
// Then we create an express router.
// Then we use the get method to handle GET requests to the /api/tax endpoint.
// Then we use the get method to handle GET requests to the /api/tax/:taxId endpoint.
// Then we use the post method to handle POST requests to the /api/tax endpoint.
// Then we use the patch method to handle PATCH requests to the /api/tax/:taxId endpoint.
// Then we export the router.
// The router will be used in the app.ts file.
// The router will handle all requests to the /api/tax endpoint.
// The router will call the appropriate controller function for each request.
// The controller functions will handle the business logic for each request.
// The controller functions will send the response to the client.
// The controller functions will also handle any errors that might occur.
// The controller functions will send the error response to the client.



const router = express.Router();

router.get("/", TaxController.getTaxes);

router.get("/:taxId", TaxController.getTax);

router.post("/", TaxController.newTax);

router.patch("/:taxId", TaxController.calculateTax)

export default router;