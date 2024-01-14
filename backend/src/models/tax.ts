import { InferSchemaType, model, Schema } from "mongoose";

const taxSchema = new Schema({
    basicSalary : { type : Number, required : true},
    hra : { type : Number },
    spla : { type : Number },
    taxCal : { type : Number },
}, { timestamps : true})

type Tax = InferSchemaType<typeof taxSchema>;

export default model<Tax>("User", taxSchema);