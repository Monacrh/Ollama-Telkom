import { Navbar, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "../../stores/slices/userSlice";

export default function NavbarComponent() {
  const user = useSelector(selectUser);
  return (
    <Navbar style={{ backgroundColor: "red" }} variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img alt="Logo" src="/telkom.png" width="30" height="30" className="d-inline-block align-top" />
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          <FaUser className="me-2" />
          {user.name}
        </div>
      </Container>
    </Navbar>
  );
}