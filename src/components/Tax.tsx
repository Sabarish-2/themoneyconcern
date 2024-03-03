import { Card } from "react-bootstrap";
import { Tax as TaxModel} from "../models/tax";

// Short explanation for the code below:
// useState is a React hook that lets you add React state to function components.
// useEffect is a React hook that lets you use side effects in function components.
// The code below is equivalent to the following React class component:
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tax: [],
//     };
//   }

// Below code will do:
// 1. Fetch tax from the backend.
// 2. Set the tax state.
// 3. Render the tax state.


interface TaxProps {
    tax : TaxModel,
    
}

const Tax = ({tax} : TaxProps) => {
    const {
        basicSalary,
        hra,
        spla,
        taxCal,
    } = tax;
    return(
        <Card>
            <Card.Body>
                <Card.Title>Tax To be Paid</Card.Title>
                <Card.Text>{taxCal}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Tax;