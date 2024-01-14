import { Card } from "react-bootstrap";
import { Tax as TaxModel} from "../models/tax";

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