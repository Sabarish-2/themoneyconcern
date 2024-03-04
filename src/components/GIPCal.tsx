import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormGroup from './FormGroup';
import './GTICal.css';

const GIPCal = () => {

    function setCookie(name: string, value: any, expirationDays: number): void {
        const date = new Date();
        date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    function getCookie(name: string): number {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) return parseFloat(cookieValue)
        }
        return null;
    }

    const [IncomeFromProperty, setIncomeFromProperty] = useState<number>(getCookie("IncomeFromProperty"));
    const [MunicipalTaxPaid, setMunicipalTaxPaid] = useState<number>(getCookie("MunicipalTaxPaid"));
    const [IntOnLoan, setIntOnLoan] = useState<number>(getCookie("IntOnLoan"));

    var GrossIPTax = getCookie("GrossIPTax");
    if (GrossIPTax === 0) GrossIPTax = null

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();

        setIncomeFromProperty(parseFloat((document.getElementById("IncomeFromProperty") as HTMLInputElement).value));
        setMunicipalTaxPaid(parseFloat((document.getElementById("MunicipalTaxPaid") as HTMLInputElement).value));
        setIntOnLoan(parseFloat((document.getElementById("IntOnLoan") as HTMLInputElement).value));


        if (!(isNaN(IncomeFromProperty) || isNaN(MunicipalTaxPaid) || isNaN(IntOnLoan))) {
        
            setCookie("IncomeFromProperty", IncomeFromProperty, 30);
            setCookie("MunicipalTaxPaid", MunicipalTaxPaid, 30);
            setCookie("IntOnLoan", IntOnLoan, 30);

            GrossIPTax = (IncomeFromProperty - MunicipalTaxPaid);
            GrossIPTax = (GrossIPTax * 0.7) - IntOnLoan;

            setCookie("GrossIPTax", GrossIPTax, 30);
            document.getElementById("Ans").innerHTML = (GrossIPTax).toString();
        } else {
            alert("All Fields are Required!")
        }
    };

    return (
        <>
            <div className="container">
                <Form id="taxDeduc" className="m-3">
                    <h4 id='Soon'>
                        Soon, you can calculate Tax Deductions here!
                    </h4>
                </Form>
                <Form id="calTax" className="m-3">
                    <h2 style={{ textAlign: "center" }}>
                        <code>Gross Income From Property Calculator</code>
                    </h2>
                    <br />
                    <FormGroup label="Income From Property (Rent)" id="IncomeFromProperty" defaultValue={IncomeFromProperty} onChange={(IncomeFromProperty) => setIncomeFromProperty(IncomeFromProperty)} />
                    <FormGroup label="Municipal Tax Paid" id="MunicipalTaxPaid" defaultValue={MunicipalTaxPaid} onChange={(MunicipalTaxPaid) => setMunicipalTaxPaid(MunicipalTaxPaid)} />
                    <FormGroup label="Interest Paid On Housing Loan" id="IntOnLoan" defaultValue={IntOnLoan} onChange={(IntOnLoan) => setIntOnLoan(IntOnLoan)} />

                    <Form.Group id='CalBtnGrp'>
                        <Button
                            onClick={buttonHandler}
                            className='m-5'
                            type='button'
                            form="calTax"
                            id="Calculate"
                        >
                            Calculate
                        </Button>
                    </Form.Group>
                    <Form.Group className="m-3">
                        <div>
                            <h4 id='Gross'>Gross Capital Gain Tax:</h4>
                            <p id="Ans">{GrossIPTax}</p>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}
export default GIPCal;