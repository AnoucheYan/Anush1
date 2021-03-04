import {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

const Conf = (props) => {

    const {onHide, onSubmit, modalMessage} = props;

    const functionsDuringConfirmation = () => {
        onSubmit();
        onHide();
    }

    return (
        <Modal show = {true} onHide = {onHide}>

            <Modal.Header closeButton>
                <Modal.Title> {modalMessage} </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    No, I have change my mind!!!
                </Button>
                <Button variant="danger" onClick={functionsDuringConfirmation}>
                    Yes, delete it!!!
                </Button>
            </Modal.Footer>

        </Modal>
    );
};


Conf.propTypes = {
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    modalMessage: PropTypes.string.isRequired
}


export default Conf;