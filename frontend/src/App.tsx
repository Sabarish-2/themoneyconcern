// import React, { useEffect, useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import './App.css';
import S1 from './components/S1';
// import setCookie from 'cookie-parser'
// import NewTaxCal from './components/NewTaxCal';
// import Tax from './components/Tax';
// import { Tax as TaxModel } from './models/tax';
// import * as TaxApi from './network/tax_api'


function App() {
//   const [tax, setTax] = useState<TaxModel[]>([]);
//   // const [taxCal, setTaxCal] = useState(0);

//   useEffect(() => {
//     async function loadTax() {
//       try {
//         const tax = await TaxApi.fetchTax();
//         setTax(tax);
//       } catch (error) {
//         console.error(error);
//         alert(error);
//       }
//     }
//     loadTax();
//   }, []);

//   const [show,setShow] = useState(false);
  


//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TaxInput>(
//     {
//         defaultValues: {
//             basicSalary: taxHistory?.basicSalary || undefined,
//             hra: taxHistory?.hra || undefined,
//             spla: taxHistory?.spla || undefined,
//             taxCal: taxHistory?.taxCal || undefined,
//         }
//     }
// );

// async function onCal(input: TaxInput) {
//     try {

//         let taxResponse: TaxM;
//         if(taxHistory){
//             taxResponse = await TaxApi.calculateTax(taxHistory._id, input); 
//         }
//         else{
//             taxResponse = await TaxApi.newUserTax(input); 
//         }
//         onTaxSaved(taxResponse);

//     } catch (error) {
//         console.error(error);
//         alert(error);
//     }
// }




  return (
    <div className="App">
      <h2>
        <code>Tax Calculation</code>
      </h2>
      <h5>Enter All Values per Month</h5>
    {/* {
      show && s
      <NewTaxCal 
      onTaxSaved={() => {}}
      // onDismiss={() => (setShow(false))}
      />
    }

    {tax.map(tax => (
      <Tax tax={tax} key={tax._id} />
    ))} */}
      {/* {tax.map(tax => (
      <Tax tax={tax} key={tax._id}/>))} */}

      {/* <NewTaxCal onTaxSaved={(newTax) => {
        setTax([...tax, newTax]);
      }} /> */}
      <S1 />

      

      

{/* <Form id="calTax" onSubmit={handleSubmit(onCal)} className="m-3"> */}
{/* <h1>HELLO!!</h1> */}

    </div >
  );
}

  export default App;