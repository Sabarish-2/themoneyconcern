import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import TaxModel from "../models/tax";

// Short explanation for the code below:
// First we import the RequestHandler type from the express library.
// Then we import the createHttpError function from the http-errors library.
// Then we import the mongoose library.
// Then we import the Tax model from the tax.ts file.
// Then we export the controller functions.
// The controller functions will handle the business logic for each request.
// The controller functions will send the response to the client.
// The controller functions will also handle any errors that might occur.
// The controller functions will send the error response to the client.


export const getTaxes: RequestHandler = async (req, res, next) => {
    try {
        const tax = await TaxModel.find().exec();
        res.status(200).json(tax);
    } catch (error) {
        next(error);
    }
};

export const getTax: RequestHandler = async (req, res, next) => {
    const taxId = req.params.taxId;

    try {
        if (!mongoose.isValidObjectId(taxId)) {
            throw createHttpError(400, "Invalid Tax Id")
        }

        const tax = await TaxModel.findById(taxId).exec();
        
        if (!tax) {
            throw createHttpError(404, "No Tax Calculation found")
        }
        
        res.status(200).json(tax);
        
    } catch (error) {
        next(error);
    }
};


interface NewTaxBody {
    basicSalary: number,
    hra?: number,
    spla?: number,
    taxCal?: number
}

export const newTax: RequestHandler<unknown, unknown, NewTaxBody, unknown> = async (req, res, next) => {
    const basicSalary = req.body.basicSalary;
    const hra = req.body.hra;
    const spla = req.body.spla;
    // const newBasicSalary = req.body.basicSalary;
    // const newHra = req.body.hra;
    // const newSpla = req.body.spla;
        
    try {
        if (!basicSalary) {
            throw createHttpError(400, "Basic Salary is Needed!");
        }
        
        const tax = await TaxModel.create({
            basicSalary: basicSalary,
            hra: hra,
            spla: spla,
            taxCal: basicSalary,
        });
        
        if (!tax) {
            throw createHttpError(404, "No Tax Calculation found")
        }
        
        tax.taxCal = basicSalary;

        if (!hra)
            tax.hra = 0;
        else
        {
            tax.hra = hra;
            tax.taxCal += hra;
        }
        
        if (!spla)
        tax.spla = 0;
        else{
            tax.spla = spla;
            tax.taxCal += spla;
        }
        
        const updatedTax = await tax.save();

      res.status(201).json(updatedTax);
    } catch (error) {
        next(error);
    }
};

interface CalTaxParams{
    taxId: string,
}

interface CalTaxBody {
    basicSalary?: number,
    hra?: number,
    spla?: number,
    taxCal? : number,
}

export const calculateTax : RequestHandler<CalTaxParams, unknown, CalTaxBody, unknown> =async (req, res, next) => {
    
    const taxId = req.params.taxId;
    const newBasicSalary = req.body.basicSalary;
    const newHra = req.body.hra;
    const newSpla = req.body.spla;
    
    
    try {
        
        if (!mongoose.isValidObjectId(taxId)) {
            throw createHttpError(400, "Invalid Tax Id")
        }
        
        if (!newBasicSalary) {
            throw createHttpError(400, "Basic Salary is Needed!");
        }
        
        const tax = await TaxModel.findById(taxId).exec();
        
        if (!tax) {
            throw createHttpError(404, "No Tax Calculation found")
        }

        tax.basicSalary = newBasicSalary;
        tax.taxCal = newBasicSalary;

        if (!newHra)
            tax.hra = 0;
        else
        {
            tax.hra = newHra;
            tax.taxCal += newHra;
        }

        if (!newSpla)
            tax.hra = 0;
        else{
            tax.hra = newSpla;
            tax.taxCal += newSpla;
        }

        const updatedTax = await tax.save();

        res.status(200).json(updatedTax)
    } catch (error) {
        next(error);
    }
};