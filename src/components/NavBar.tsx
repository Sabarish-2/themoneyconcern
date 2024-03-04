// import { Nav, Navbar } from "react-bootstrap";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {

    return (
        // <Navbar className="App">
        //     <Navbar.Brand as={Link} to="/Home">The Money Concern</Navbar.Brand>
        //     <Navbar.Toggle aria-controls="main-navbar"/>
        //     <Navbar.Collapse className="justify-content-end">
        //         <Nav>
        //             <Nav.Link as={Link} to="/gtical">Gross Total Income</Nav.Link>
        //             <Nav.Link as={Link} to="/gcal">Gross What?</Nav.Link>
        //         </Nav>
                
        //     </Navbar.Collapse>
        // </Navbar>
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <Link className="navbar-brand" to="/">The Money Concern</Link>
                <Link className="nav-link" to="/gtical">Gross Salary</Link>
                <Link className="nav-link" to="/gcgcal">Capital Gain Tax</Link>
                <Link className="nav-link" to="/gipcal">Gross Income From Property</Link>
            </nav>
        </div>
    );
}

export default NavBar;