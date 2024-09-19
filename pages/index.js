/********************************************************************************* 
*  BTI425 – Assignment 5 
* 
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy: 
*  
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
*  
*  Name: Jivin Chugh     Student ID: 156056210       Date: 22nd March, 2024 
* 
********************************************************************************/
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    return (
        <Container>
            <Row>
                <Col md={12} className="text-center">
                    <image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" alt="MET Building" className="img-fluid rounded" style={{ maxWidth: '80%', margin: 'auto' }} />
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col md={6}>
                    <p>
                        The Metropolitan Museum of Art of New York City, colloquially &quot;the Met&quot;, is the largest art museum in the Americas. Its permanent collection contains over two million works, divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan&apos;s Upper East Side, is by area one of the world&apos;s largest art museums. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.
                    </p>
                    <p>
                        The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum&apos;s permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European masters, and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.
                    </p>
                </Col>
                <Col md={6}>
                    <p>
                        The Met&apos;s permanent collection is curated by seventeen separate departments, each with a specialized staff of curators and scholars, as well as six dedicated conservation departments and a Department of Scientific Research. The permanent collection includes works of art from classical antiquity and ancient Egypt; paintings and sculptures from nearly all the European masters; and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is also home to encyclopedic collections of musical instruments, costumes and accessories, and antique weapons and armor from around the world. A great number of period rooms, ranging from first-century Rome through modern American design, are permanently installed in the Met&apos;s galleries. Since the late 1800s, the Museum has been collecting diverse materials from all over the world. It reaches out to &quot;exhibition designers, architects, graphic designers, lighting designers, and production designers&quot; that enables the museum to maintain its collection in good conditions.
                    </p>
                    <p>
                        For more information, visit the <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia entry</a>.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
