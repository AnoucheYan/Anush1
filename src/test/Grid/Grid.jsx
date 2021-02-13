import Block from '../Block';
import { Container, Row, Col } from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';


const Grid = () => {

    const blocksJSXArray = [];

    for (let i = 0; i < 20; i++) {
        blocksJSXArray.push(
            <Col key={idGenerator()} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mt-3" >
                <Block />
            </Col>
        );
    }

    return (
    <div>
        
        <Container>
            <Row className="justify-content-center mt-4">
                <h1> Grid Component </h1>
            </Row>
            <Row className="Justify-content-center mt-4">                
                {blocksJSXArray}                
            </Row>
        </Container>
        
    </div>
    );
};

export default Grid;