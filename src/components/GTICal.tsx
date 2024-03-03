import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormGroup from './FormGroup';
import './GTICal.css';

const GTICal = () => {

    function setCookie(name: string, value: number, expirationDays: number): void {
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
            if (cookieName === name) {
                return parseFloat(cookieValue);
            }
        }
        return null;
    }

    const Metro = [
        {
            key: 1,
            label: "Yes",
            value: 0.5,
        },
        {
            key: 0,
            label: "No",
            value: 0.4,
        },
    ];

    const [BS, setBS] = useState<number>(getCookie("BS"));
    const [HRA, setHRA] = useState<number>(getCookie("HRA"));
    const [SPLA, setSPLA] = useState<number>(getCookie("SPLA"));
    const [LTA, setLTA] = useState<number>(getCookie("LTA"));
    const [Rent, setRent] = useState<number>(getCookie("Rent"));
    const [BillSub, setBillSub] = useState<number>(getCookie("BillSub"));
    const [StdDeduct, setStdDeduct] = useState<number>(getCookie("StdDeduct"));
    const [DrnsAll, setDrnsAll] = useState<number>(getCookie("DrnsAll"));
    var MetroPercent: number, TaxCal = getCookie("TaxCal");
    if (TaxCal === 0) { TaxCal = null; }
    const [selected, setSelected] = useState(getCookie("MetroPercent") || Metro[0].key);
    
    
    const handleChange = event => {
        setSelected(event.target.key);
        MetroPercent = event.target.value;
        setCookie("MetroPercent", MetroPercent, 30);
    };
    

    
    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        
        setBS(parseFloat((document.getElementById("BasicSalary") as HTMLInputElement).value));
        setHRA(parseFloat((document.getElementById("HRA") as HTMLInputElement).value));
        setSPLA(parseFloat((document.getElementById("SPLA") as HTMLInputElement).value));
        setLTA(parseFloat((document.getElementById("LTA") as HTMLInputElement).value));
        setRent(parseFloat((document.getElementById("Rent") as HTMLInputElement).value));
        setBillSub(parseFloat((document.getElementById("BillSub") as HTMLInputElement).value));
        setStdDeduct(parseFloat((document.getElementById("StdDeduct") as HTMLInputElement).value));
        setDrnsAll(parseFloat((document.getElementById("DrnsAll") as HTMLInputElement).value));
        
        // handleChange(document.getElementById("MP"));
        
        if (!(isNaN(BS) || isNaN(HRA) || isNaN(SPLA) || isNaN(LTA) || isNaN(Rent) || isNaN(BillSub) || isNaN(StdDeduct) || isNaN(DrnsAll))) {

            setCookie("BS", BS, 30);
            setCookie("HRA", HRA, 30);
            setCookie("SPLA", SPLA, 30);
            setCookie("LTA", LTA, 30);
            setCookie("Rent", Rent, 30);
            setCookie("BillSub", BillSub, 30);
            setCookie("StdDeduct", StdDeduct, 30);
            setCookie("DrnsAll", DrnsAll, 30);
            
            MetroPercent = getCookie("MetroPercent") || 0.5;
            
            setCookie("MetroPercent", MetroPercent, 30);
            
            const BSy = BS * 12, HRAy = HRA * 12, SPLAy = SPLA * 12, Renty = Rent * 12;
            
            var Exempt1 = HRAy;
            var Exempt2 = BSy * MetroPercent;
            var Exempt3 = Renty - (BSy / 10);
            var ExemptMin: number;
            
            if ((Exempt1 < Exempt2) && (Exempt1 < Exempt3) && (Exempt1 > 0)) {
                ExemptMin = Exempt1;
            } else if (Exempt2 < Exempt3 && (Exempt2 > 0)) {
                ExemptMin = Exempt2;
            } else if (Exempt3 > 0) {
                ExemptMin = Exempt3;
            } else {
                ExemptMin = 0;
            }
            if (ExemptMin < 0) {
                ExemptMin = 0;
            }
            
            TaxCal = BSy + (HRAy - ExemptMin) + SPLAy + (LTA - BillSub) - StdDeduct;
            if (TaxCal === 0) { 
                TaxCal = null; 
                alert("All Fields are Required!")
            }
            else {
                setCookie("TaxCal", TaxCal, 30);
                document.getElementById("Ans").innerHTML = (TaxCal).toString();
            } 
        } else {
            alert("All Fields are Required!")
        }
        
        event.preventDefault();
    };
    
    return (
        <>
            <div className="container">
                <Form id="taxDeduc" className="m-3">
                    <h4 id='Soon'>
                        Soon, you can calculate Tax Deductions!!!
                    </h4>
                </Form>
                {/* <br /> */}
                <Form id="calTax" className="m-3">

                    <h2 style={{ textAlign: "center" }}>
                        <code>Gross Salary Calculator</code>
                    </h2>

                    <Form.Group>
                        <h5 className="m-3" style={{ textAlign: "center" }}>Enter All Values per Month</h5>
                    </Form.Group>
                    <br />

                    <FormGroup label="Basic Salary" id="BasicSalary" defaultValue={BS} onChange={(BS) => setBS(BS)} />

                    <FormGroup label="Dearness Allowances" id="DrnsAll" defaultValue={DrnsAll} onChange={(DrnsAll) => setDrnsAll(DrnsAll)} />

                    <FormGroup label="HRA" id="HRA" defaultValue={HRA} onChange={(HRA) => setHRA(HRA)} />

                    <FormGroup label="LTA" id="LTA" defaultValue={LTA} onChange={(LTA) => setLTA(LTA)} />

                    <FormGroup label="Rent Paid" id="Rent" defaultValue={Rent} onChange={(Rent) => setRent(Rent)} />

                    <FormGroup label="Bills Submitted" id="BillSub" defaultValue={BillSub} onChange={(BillSub) => setBillSub(BillSub)} />

                    <FormGroup label="Standard Deduction" id="StdDeduct" defaultValue={StdDeduct} onChange={(StdDeduct) => setStdDeduct(StdDeduct)} />

                    <div className="select-container">
                        <Form.Label className="m-3">I Live In MetroPolitan City</Form.Label>
                        <select id="MP" value={selected} onChange={handleChange}>
                            {Metro.map((option) => (
                                <option key={option.key} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <FormGroup label="Special Allowances" id="SPLA" defaultValue={SPLA} onChange={(SPLA) => setSPLA(SPLA)} />
                    <Form.Group id='CalBtnGrp'>
                        <Button
                            onClick={buttonHandler}
                            className='m-5'
                            type='submit'
                            form="calTax"
                            id="Calculate"
                        >
                            Calculate
                        </Button>
                    </Form.Group>
                    <Form.Group className="m-3">
                        <div>
                            <h4 id='Gross'>Gross Salary :</h4>
                            <p id="Ans">{TaxCal}</p>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}
export default GTICal;