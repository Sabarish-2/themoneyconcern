import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import taxRoutes from "./routes/tax";
import morgan from 'morgan'
import createHttpError, { isHttpError } from "http-errors";


// Short explanation for the code below:
// First we import the express library.
// Then we import the taxRoutes from the tax.ts file.
// Then we import the morgan library.
// Then we import the createHttpError and isHttpError functions from the http-errors library.
// Then we create an express application.
// Then we use the morgan middleware to log the requests to the console.
// Then we use the express.json middleware to parse the request body.
// Then we use the taxRoutes.
// Then we use a middleware to handle 404 errors.
// Then we use a middleware to handle all other errors.
// The middleware will log the error to the console.
// Then it will check if the error is an HttpError.
// If it is an HttpError, it will set the status code and the error message.
// Then it will send the response to the client.
// If it is not an HttpError, it will set the status code to 500 and the error message to "An Unknown Error Occurred !!".
// Then it will send the response to the client.



const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/tax", taxRoutes);
 
app.use((req, res, next) => {
    throw next(createHttpError(404, "EndPoint not Found!"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error : unknown, req: Request, res : Response, next : NextFunction) => {
    console.error(error);
    let errorMessage = "An Unknown Error Occurred !!";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error : errorMessage});
});

export default app;