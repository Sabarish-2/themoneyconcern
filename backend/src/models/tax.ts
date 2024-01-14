import { InferSchemaType, model, Schema } from "mongoose";


// Short explanation for the code below:
// First we import the InferSchemaType, model and Schema types from the mongoose library.
// Then we create a schema for the tax calculation.
// Then we export the schema.
// The schema will be used in the tax.ts file.
// The schema will be used to create a model.
// The model will be used in the tax.ts file.
// The model will be used to create a document.
// The document will be used in the tax.ts file.
// The document will be used to create a response.


const taxSchema = new Schema({
    basicSalary : { type : Number, required : true},
    hra : { type : Number },
    spla : { type : Number },
    taxCal : { type : Number },
}, { timestamps : true})

type Tax = InferSchemaType<typeof taxSchema>;

export default model<Tax>("User", taxSchema);