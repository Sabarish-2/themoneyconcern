import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormGroup from './FormGroup';
import './GTICal.css';

const GCGCal = () => {

    function setCookie(name: string, value: any, expirationDays: number): void {
        const date = new Date();
        date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    function getCookie(name: string): any {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                if (typeof cookieValue === 'boolean') return cookieValue
                else {
                    return parseFloat(cookieValue);
                }
            }
        }
        return null;
    }

    // const Metro = [
    //     {
    //         key: 1,
    //         label: "Yes",
    //         value: 0.5,
    //     },
    //     {
    //         key: 0,
    //         label: "No",
    //         value: 0.4,
    //     },
    // ];

    const [StockPurchase, setStockPurchase] = useState<number>(getCookie("StockPurchase"));
    const [StockSale, setStockSale] = useState<number>(getCookie("StockSale"));
    const [StockOld, setStockOld] = useState<boolean>(getCookie("StockOld") || false);
    const [MFPurchase, setMFPurchase] = useState<number>(getCookie("MFPurchase"));
    const [MFSale, setMFSale] = useState<number>(getCookie("MFSale"));
    const [MFOld, setMFOld] = useState<boolean>(getCookie("MFOld") || false);
    const [PropertyPurchase, setPropertyPurchase] = useState<number>(getCookie("PropertyPurchase"));
    const [PropertySale, setPropertySale] = useState<number>(getCookie("PropertySale"));
    const [PropertyOld, setPropertyOld] = useState<boolean>(getCookie("PropertyOld") || false);
    const [GoldPurchase, setGoldPurchase] = useState<number>(getCookie("GoldPurchase"));
    const [GoldSale, setGoldSale] = useState<number>(getCookie("GoldSale"));
    const [GoldOld, setGoldOld] = useState<boolean>(getCookie("GoldOld") || false);
    var GrossCGTax = getCookie("CGTax");
    if (GrossCGTax === 0) { GrossCGTax = null; }


    // const handleChange = event => {
    //     setSelected(event.target.key);
    //     MetroPercent = event.target.value;
    //     setCookie("MetroPercent", MetroPercent, 30);
    // };


    
    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();
        setStockPurchase(parseFloat((document.getElementById("StockPurchase") as HTMLInputElement).value));
        setStockSale(parseFloat((document.getElementById("StockSale") as HTMLInputElement).value));
        // setStockOld((document.getElementById("StockPurchase") as HTMLInputElement).checked);
        setMFPurchase(parseFloat((document.getElementById("MFPurchase") as HTMLInputElement).value));
        setMFSale(parseFloat((document.getElementById("MFSale") as HTMLInputElement).value));
        // setMFOld((document.getElementById("MFPurchase") as HTMLInputElement).checked);
        setPropertyPurchase(parseFloat((document.getElementById("PropertyPurchase") as HTMLInputElement).value));
        setPropertySale(parseFloat((document.getElementById("PropertySale") as HTMLInputElement).value));
        // setPropertyOld((document.getElementById("PropertyPurchase") as HTMLInputElement).checked);
        setGoldPurchase(parseFloat((document.getElementById("GoldPurchase") as HTMLInputElement).value));
        setGoldSale(parseFloat((document.getElementById("GoldSale") as HTMLInputElement).value));


        if (!(isNaN(StockPurchase) || isNaN(StockSale) || isNaN(MFPurchase) || isNaN(MFSale) || isNaN(PropertyPurchase) || isNaN(PropertySale) || isNaN(GoldPurchase) || isNaN(GoldSale))) {

            setCookie("StockPurchase", StockPurchase, 30);
            setCookie("StockSale", StockSale, 30);
            setCookie("StockOld", StockOld, 30);
            setCookie("MFPurchase", MFPurchase, 30);
            setCookie("MFSale", MFSale, 30);
            setCookie("MFOld", MFOld, 30);
            setCookie("PropertyPurchase", PropertyPurchase, 30);
            setCookie("PropertySale", PropertySale, 30);
            setCookie("PropertyOld", PropertyOld, 30);
            setCookie("GoldPurchase", GoldPurchase, 30);
            setCookie("GoldSale", GoldSale, 30);
            setCookie("GoldOld", GoldOld, 30);

            const StockCG = StockSale - StockPurchase;
            const MFCG = MFSale - MFPurchase;
            const PropertyCG = PropertySale - PropertyPurchase;
            const GoldCG = GoldSale - GoldPurchase;

            GrossCGTax = 0
            if (StockOld) GrossCGTax += (StockCG * 0.1);
            else GrossCGTax += (StockCG * 0.15);
            if (MFOld) GrossCGTax += (MFCG * 0.1);
            else GrossCGTax += (MFCG * 0.15);
            if (PropertyOld) GrossCGTax += (PropertyCG * 0.2);
            else GrossCGTax += (PropertyCG * 0.3);
            if (GoldOld) GrossCGTax += (GoldCG * 0.2);
            else GrossCGTax += (GoldCG * 0.3);

            // if (GrossCGTax === 0) {
            //     GrossCGTax = null;
            //     alert("All Fields are Required!")
            // }
            // else {
                setCookie("GrossCGTax", GrossCGTax, 30);
                document.getElementById("Ans").innerHTML = (GrossCGTax).toString();
            // }
        } else {
            alert("Stock: " + StockPurchase + " " + StockSale + " " + StockOld + " " + MFPurchase + " " + MFSale + " " + MFOld + " " + PropertyPurchase + " " + PropertySale + " " + PropertyOld + " " + GoldPurchase + " " + GoldSale + " " + GoldOld + " " + GrossCGTax)
            alert("All Fields are Required!")
        }
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
                        <code>Gross Capital Gain Tax Calculator</code>
                    </h2>

                    {/* <Form.Group>
                        <h5 className="m-3" style={{ textAlign: "center" }}>Enter All Values per Month</h5>
                    </Form.Group> */}
                    <br />

                    <FormGroup label="Stock Purchase Price" rlabel1="Purchased less than a Year" rlabel2="Purchased Year Ago"  id="StockPurchase" defaultValue={StockPurchase} onChange={(StockPurchase, isSecond) => {
                        setStockPurchase(StockPurchase)
                        setStockOld(isSecond)
                    }} />
                    <FormGroup label="Stock Sale Price" id="StockSale" defaultValue={StockSale} onChange={(StockSale) => setStockSale(StockSale)} />
                    <FormGroup label="Mutual Fund Purchase Price" rlabel1="Purchased less than a Year" rlabel2="Purchased Year Ago"  id="MFPurchase" defaultValue={MFPurchase} onChange={(MFPurchase, isSecond) => {
                        setMFPurchase(MFPurchase)
                        setMFOld(isSecond)
                    }} />
                    <FormGroup label="Mutual Fund Sale Price" id="MFSale" defaultValue={MFSale} onChange={(MFSale) => setMFSale(MFSale)} />
                    <FormGroup label="Property Purchase Price" rlabel1="Purchased less than a Year" rlabel2="Purchased Year Ago"  id="PropertyPurchase" defaultValue={PropertyPurchase} onChange={(PropertyPurchase, isSecond) => {
                        setPropertyPurchase(PropertyPurchase)
                        setPropertyOld(isSecond)
                    }} />
                    <FormGroup label="Property Sale Price" id="PropertySale" defaultValue={PropertySale} onChange={(PropertySale) => setPropertySale(PropertySale)} />
                    <FormGroup label="Gold Purchase Price" rlabel1="Purchased less than a Year" rlabel2="Purchased Year Ago"  id="GoldPurchase" defaultValue={GoldPurchase} onChange={(GoldPurchase, isSecond) => {
                        setGoldPurchase(GoldPurchase)
                        setGoldOld(isSecond)
                    }} />
                    <FormGroup label="Gold Sale Price" id="GoldSale" defaultValue={GoldSale} onChange={(GoldSale) => setGoldSale(GoldSale)} />

                    {/* <div className="select-container">
                        <Form.Label className="m-3">I Live In MetroPolitan City</Form.Label>
                        <select id="MP" value={selected} onChange={handleChange}>
                            {Metro.map((option) => (
                                <option key={option.key} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div> */}

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
                            <p id="Ans">{GrossCGTax}</p>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}
export default GCGCal;