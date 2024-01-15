import { cleanEnv } from "envalid"
import { port, str } from "envalid/dist/validators";

// Short explanation for the code below:
// First we import the cleanEnv, port and str functions from the envalid library.
// Then we export the environment variables.
// The environment variables will be used in the server.ts file.
// The environment variables will be used to connect to the database.
// The environment variables will be used to start the server.
// The environment variables will be used to validate the request body.


export default cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
    
});