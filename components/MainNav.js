import { useState } from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '@/lib/userData';
import { readToken,removeToken } from '@/lib/authenticate';
const MainNav = () => {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // Get searchHistory and setSearchHistory from the atom
    const token = readToken();
    const handleSubmit = (event) => {
        event.preventDefault();
        const searchField = event.target.elements.search.value;
        const queryString = `title=true&q=${searchField}`;
        setSearchHistory(current => [...current, queryString]); // Add the queryString to searchHistory
        router.push(`/artwork?${queryString}`);
        setIsExpanded(false); // Close the navbar after form submission
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded); // Toggle the isExpanded state
    };

    const handleNavLinkClick = () => {
        setIsExpanded(false); // Close the navbar when a Nav.Link is clicked
    };

    function logout() {
        setIsExpanded(false);
        removeToken();
        router.push('/login');
    }

    return (
        <>
            <Navbar expand="lg" className="fixed-top navbar-dark bg-primary sticky-top" expanded={isExpanded}>
                <Container fluid>
                    <Navbar.Brand>Jivin Chugh</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleExpanded} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" onClick={handleNavLinkClick}>
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>Home</Nav.Link>
                            </Link>
                            {token && (
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link>Advanced Search</Nav.Link>
                            </Link>)}
                        </Nav>
                        <Form onSubmit={handleSubmit} className="d-flex">
                            <FormControl
                                type="text"
                                name="search"
                                placeholder="Search"
                                className="me-2"
                            />
                            <Button type="submit">Submit</Button>
                        </Form>
                        <br />
                        {/* New NavDropdown for User Name */}
                        {token && (
                        <NavDropdown title="username">
                            <Link href="/favourites" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/favourites"} onClick={handleNavLinkClick}>Favourites</NavDropdown.Item>
                            </Link>
                            <Link href="/history" passHref legacyBehavior>
                                <NavDropdown.Item active={router.pathname === "/history"} onClick={handleNavLinkClick}>Search History</NavDropdown.Item>
                            </Link>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>)}
                        {!token && (
                        <Nav>
                            <Link href="/register" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/register"} onClick={handleNavLinkClick}>Register</Nav.Link>
                            </Link>
                            <Link href="/login" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/login"} onClick={handleNavLinkClick}>Login</Nav.Link>
                            </Link>
                        </Nav>)}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default MainNav;
