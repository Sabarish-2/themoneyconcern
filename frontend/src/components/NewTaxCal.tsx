import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Tax as TaxM } from '../models/tax'
import { TaxInput } from '../network/tax_api'
import * as TaxApi from '../network/tax_api'
import { useState } from "react";
import Tax from "./Tax";


interface caltaxProps {
    onTaxSaved: (tax: TaxM) => void,
    taxHistory? : TaxM,
}

const NewTaxCal = ({ onTaxSaved , taxHistory }: caltaxProps) => {

    // const{
    //     taxCal,
    // } = taxHistory

    const [tax, setTax] = useState<TaxM[]>([]);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TaxInput>(
        {
            defaultValues: {
                basicSalary: taxHistory?.basicSalary || undefined,
                hra: taxHistory?.hra || undefined,
                spla: taxHistory?.spla || undefined,
                taxCal: taxHistory?.taxCal || undefined,
            }
        }
    );

    async function onCal(input: TaxInput) {
        try {

            let taxResponse: TaxM;
            if(taxHistory){
                taxResponse = await TaxApi.calculateTax(taxHistory._id, input); 
            }
            else{
                taxResponse = await TaxApi.newUserTax(input); 
            }
            onTaxSaved(taxResponse);

        } catch (error) {
            console.error(error);
            alert(error);
        }
    }


    return (
        <Form id="calTax" onSubmit={handleSubmit(onCal)} className="m-3">
            <Form.Group>
                <Form.Label className="m-3">Basic Salary</Form.Label>
                <Form.Control
                    type="number"
                    placeholder='Basic Salary'
                    isInvalid={!!errors.basicSalary}
                    {...register("basicSalary", { required: "Required" })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.basicSalary?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
                <Form.Label className="m-3">HRA</Form.Label>
                <Form.Control   
                    type="number"
                    placeholder='HRA'
                    {...register("hra")}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label className="m-3">Special Allovances</Form.Label>
                <Form.Control
                    type="number"
                    placeholder='Spl All'
                    {...register("spla")}
                />
                <Button
                    className='m-5'
                    type='submit'
                    form="calTax"
                    disabled={isSubmitting}>
                    Calculate
                </Button>

                <div>
                    <h5 className='m-5'>
                    Tax to be Paid :
                </h5>
                
                {/* <h1>{taxCal}</h1> */}

                <h5>{tax.map(tax => (
                    tax.taxCal &&
                    <Tax tax={tax} key={tax.taxCal} />
                ))}</h5>
                </div>
                
            </Form.Group>

        </Form>
    );
}

export default NewTaxCal;