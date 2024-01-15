import app from './app';
import env from './util/validateEnv';
import mongoose from "mongoose";

// Short explanation for the code below:
// First we import the app from the app.ts file.
// Then we import the validateEnv function from the validateEnv.ts file.
// Then we import the mongoose library.
// Then we call the validateEnv function and pass the environment variables to it.
// Then we connect to the database using the mongoose.connect function.
// Then we call the app.listen function and pass the port and a callback function to it.
// The callback function will be called when the server is running and listening for requests.
// The callback function will log a message to the console.

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log("M COnn");

        app.listen(port, () => {
            console.log("Server Running on Port : " + port);
        });

    })
    .catch(console.error);
