import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './S1.css'

const S1 = () => {

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
    return 0;
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

  var TaxCal: number, BS: number, HRA: number, SPLA: number, LTA: number, Rent: number, BillSub: number, StdDeduct: number, MetroPercent: number, DrnsAll: number;
  const [selected, setSelected] = useState(getCookie("MetroPercent") || Metro[0].key);

  if (getCookie("BS") !== 0 && getCookie("TaxCal") !== 0) {
    BS = getCookie("BS");
    HRA = getCookie("HRA");
    SPLA = getCookie("SPLA");
    LTA = getCookie("LTA");
    Rent = getCookie("Rent");
    BillSub = getCookie("BillSub");
    StdDeduct = getCookie("StdDeduct");
    DrnsAll = getCookie("DrnsAll");
    TaxCal = getCookie("TaxCal");
  }

  // console.log(event.target.value);
  // console.log(event.target.label);
  // console.log(event.target.key);
  const handleChange = event => {
    setSelected(event.target.key);
    MetroPercent = event.target.value;
    setCookie("MetroPercent", MetroPercent, 30);
  };



  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    BS = parseFloat((document.getElementById("BasicSalary") as HTMLInputElement).value);
    HRA = parseFloat((document.getElementById("HRA") as HTMLInputElement).value);
    SPLA = parseFloat((document.getElementById("SPLA") as HTMLInputElement).value);
    LTA = parseFloat((document.getElementById("LTA") as HTMLInputElement).value);
    Rent = parseFloat((document.getElementById("Rent") as HTMLInputElement).value);
    BillSub = parseFloat((document.getElementById("BillSub") as HTMLInputElement).value);
    StdDeduct = parseFloat((document.getElementById("StdDeduct") as HTMLInputElement).value);
    DrnsAll = parseFloat((document.getElementById("DrnsAll") as HTMLInputElement).value);

    // handleChange(document.getElementById("MP"));

    if (!(isNaN(BS) || isNaN(HRA) || isNaN(SPLA) || isNaN(LTA) || isNaN(Rent) || isNaN(BillSub) || isNaN(StdDeduct) || isNaN(DrnsAll))) {

      setCookie("BS", BS, 30);
      setCookie("HRA", HRA, 30);
      setCookie("SPLA", SPLA, 30);
      setCookie("LTA", LTA, 30);
      setCookie("Rent", Rent, 30);
      setCookie("BillSub", BillSub, 30);
      setCookie("StdDeduct", StdDeduct, 30);
      
      MetroPercent = getCookie("MetroPercent") || 0.5;
      
      setCookie("MetroPercent", MetroPercent, 30);

      const BSy = BS * 12, HRAy = HRA * 12, SPLAy = SPLA * 12, Renty = Rent * 12;

      var Excempt1 = HRAy;
      var Excempt2 = BSy * MetroPercent;
      var Excempt3 = Renty - (BSy / 10);
      var ExcemptMax: number;

      if (Excempt1 < 0)
        Excempt1 = Excempt2;
      if (Excempt2 < 0)
        Excempt2 = Excempt3;
      if (Excempt3 < 0)
        Excempt3 = Excempt1;

      if ((Excempt1 < Excempt2) && (Excempt1 < Excempt3)) {
        ExcemptMax = Excempt1;
      } else if (Excempt2 < Excempt3) {
        ExcemptMax = Excempt2;
      } else {
        ExcemptMax = Excempt3;
      }
      if (ExcemptMax < 0) {
        ExcemptMax = 0;
      }

      TaxCal = BSy + (HRAy - ExcemptMax) + SPLAy + (LTA - BillSub) - StdDeduct;

      setCookie("TaxCal", TaxCal, 30);
      document.getElementById("Ans").innerHTML = (TaxCal).toString();
    } else {
      alert("All Fields are Required!")
      // setCookie("TaxCal", undefined, 30);
      // TaxCal = 0;
    }

    event.preventDefault();
  };

  return (
    <>

      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <a className="navbar-brand" href="#">My App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </nav>


      {/* <nav>
  <div className="logo">
    <a href="#">Logo</a>
  </div>
  <div className="nav-links">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </div>
  <div className="burger">
    <div className="line1"></div>
    <div className="line2"></div>
    <div className="line3"></div>
  </div>
</nav> */}



      <div className="container">
        <Form id="calTax" className="m-3">
          <Form.Group>
            <Form.Label className="m-3">Basic Salary</Form.Label>
            <input
              type="number"
              placeholder='BasicSalary'
              id='BasicSalary'
              defaultValue={BS}

            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="m-3">Dearness Allowances</Form.Label>
            <input
              type="number"
              placeholder='Dearness Allowance'
              id='DrnsAll'
              defaultValue={DrnsAll}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="m-3">HRA</Form.Label>
            <input
              type="number"
              placeholder='HRA'
              id='HRA'
              defaultValue={HRA}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="m-3">LTA</Form.Label>
            <input
              type="number"
              placeholder='LTA'
              id='LTA'
              defaultValue={LTA}

            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="m-3">Rent Paid</Form.Label>
            <input
              type="number"
              placeholder='Rent'
              id='Rent'
              defaultValue={Rent}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="m-3">Bills Submitted</Form.Label>
            <input
              type="number"
              placeholder='BillSub'
              id='BillSub'
              defaultValue={BillSub}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="m-3">Standard Deduction</Form.Label>
            <input
              type="number"
              placeholder='Your Standard Deduction'
              id='StdDeduct'
              defaultValue={StdDeduct}
            />
          </Form.Group>

          <div className="select-container">
            <Form.Label className="m-3">I Live In MetroPolitan City</Form.Label>
            <select id="MP" value={selected} onChange={handleChange}>
              {Metro.map((option) => (
                <option key={option.key} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <Form.Group>
            <Form.Label className="m-3">Special Allowances</Form.Label>
            <input
              type="number"
              placeholder='Special Allowance'
              id='SPLA'
              defaultValue={SPLA}
            />
          </Form.Group>
          <Form.Group className="m-3">
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
              <h4 id='Gross'>
                {/* Tax to be Paid : */}
                Gross Total Income :
              </h4>
              <p id="Ans"><> {TaxCal} </></p>

            </div>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
export default S1;