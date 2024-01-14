import * as TaxController from '../controllers/taxc';
import express from 'express';

const router = express.Router();

router.get("/", TaxController.getTaxes);

router.get("/:taxId", TaxController.getTax);

router.post("/", TaxController.newTax);

router.patch("/:taxId", TaxController.calculateTax)

export default router;