import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";

const Navigation = () => {
         
    // const Kit = styled(Button)`
    // & {
    //     background-color: transparent;
    //     border: none;
    //     pointer-events: none;

    //     &:hover {
    //         background-color: transparent;
    //     }

    //     Button {
    //         pointer-events: initial;
    //         border: 1px whitesmoke solid;
    //         color: whitesmoke;

    //         &:hover {
    //             background-color: teal;
    //             color: white;
    //         }
    //     }
    // }
    // `;

    const StyledNav = styled.div`
        & {
            Nav {
                Form {
                    Button {
                        color: white;
                        border: .5px whitesmoke solid;
                        box-shadow: none;

                        &:hover {
                            color: black;
                            background-color: whitesmoke;
                        }
                    }
                }
            }
        }
    `;

    return ( 
        <>
            <StyledNav>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Sunglasses or Umbrella?</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#features">Features</Nav.Link>
                                <Nav.Link href="#pricing">Pricing</Nav.Link>
                            </Nav>
                            <Nav>
                                <Form className="d-flex">
                                    <FormControl
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    {/* <Kit> */}
                                    <Button className="shadow-none" variant="outline-success">Search</Button>
                                    {/* </Kit> */}
                                </Form>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </StyledNav>
        </>
     );
}
 
export default Navigation;