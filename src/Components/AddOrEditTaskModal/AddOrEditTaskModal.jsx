import React, { /*{ useRef, useEffect }*/ }from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import isoDate from '../../helpers/IsoDate';
// import { connect } from 'react-redux';
// import actionTypes from '../../Redux/actionTypes';
// import { } from '../../Redux/actions';


class AddOrEditTaskModal extends React.Component {

    constructor(props) {
        super(props);

        this.inputRef = React.createRef();

        this.state = {
            ...props.changableTask,
            title: props.changableTask ? props.changableTask.title : '',
            description: props.changableTask ? props.changableTask.description : '',
            date: props.changableTask ? new Date(props.changableTask.date) : new Date(),
        }
    }

    hendleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleS = ({ key, type }) => {
        const { title, description } = this.state;
        const { onSubmit } = this.props;
        if ((type === 'keypress' && key !== 'Enter') || !(!!title || !!description)) return;

        const dataObj = { ...this.state };
        dataObj.date = isoDate(dataObj.date);

        onSubmit(dataObj);
    }

    setDate = (date) => {
        this.setState({
            date
        });
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render() {
        const { title, description, date } = this.state;
        const { onHide, changableTask } = this.props;

        return (
            <div>
                <Modal
                    show={true}
                    onHide={onHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {changableTask ? "Make Your adjustments" : "Add new task!!!"}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="d-flex flex-column align-items-center">
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            onChange={this.hendleChange}
                            value={title}
                            onKeyPress={this.handleS}
                            style={{ width: "60%" }}
                            ref={this.inputRef}
                            name="title"
                        />

                        <Form.Control
                            as="textarea"
                            rows={2}
                            style={{ width: "60%", resize: "none" }}
                            className="my-3"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={this.hendleChange}
                            onKeyPress={this.handleS}
                        />
                        <DatePicker
                            selected={date}
                            onChange={date => this.setDate(date)}
                        />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleS}
                            disabled={!(!!title && !!description)}
                        >
                            {changableTask ? "Save changes" : "Add task"}
                        </Button>
                        <Button onClick={() => onHide()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

AddOrEditTaskModal.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    onHide: PropTypes.func.isRequired,
    changableTask: PropTypes.object
}


export default AddOrEditTaskModal;


// const AddOrEditTaskModal = (props) => {

//     // constructor(props) {
//     //     super(props);

//     // this.inputRef = React.createRef();
//     const inputRef = useRef(null);

//     // this.state = {
//     // ...props.changableTask,
//     // title: props.changableTask?props.changableTask.title:'',
//     // description: props.changableTask?props.changableTask.description:'',
//     // date: props.changableTask? new Date(props.changableTask.date): new Date(),
//     //  }
//     // }

//     const hendleChange = (event) => {
//         const { name, value } = event.target;
//         this.setState({
//             [name]: value
//         });
//     }

//     const handleS = ({ key, type }) => {
//         const { title, description } = this.state;
//         const { onSubmit } = this.props;
//         if ((type === 'keypress' && key !== 'Enter') || !(!!title || !!description)) return;

//         const dataObj = { ...this.state };
//         dataObj.date = isoDate(dataObj.date);

//         onSubmit(dataObj);
//     }

//     const setDate = (date) => {
//         // this.setState({
//         //     date
//         // });
//     }

//     // componentDidMount() {
//     //     this.inputRef.current.focus();
//     // }
//     useEffect(() => {
//         inputRef.current.focus();
//     }, []);

//     // const { title, description, date } = this.state;
//     const { title, description, date } = props;
//     const { onHide, changableTask } = props;

//     return (
//         <div>
//             <Modal
//                 show={true}
//                 onHide={onHide}
//                 size="lg"
//                 aria-labelledby="contained-modal-title-vcenter"
//                 centered
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title id="contained-modal-title-vcenter">
//                         {changableTask ? "Make Your adjustments" : "Add new task!!!"}
//                     </Modal.Title>
//                 </Modal.Header>

//                 <Modal.Body className="d-flex flex-column align-items-center">
//                     <Form.Control
//                         type="text"
//                         placeholder="Title"
//                         onChange={hendleChange}
//                         value={title}
//                         onKeyPress={handleS}
//                         style={{ width: "60%" }}
//                         ref={inputRef}
//                         name="title"
//                     />

//                     <Form.Control
//                         as="textarea"
//                         rows={2}
//                         style={{ width: "60%", resize: "none" }}
//                         className="my-3"
//                         placeholder="Description"
//                         name="description"
//                         value={description}
//                         onChange={hendleChange}
//                         onKeyPress={handleS}
//                     />
//                     <DatePicker
//                         selected={date}
//                         onChange={date => setDate(date)}
//                     />
//                 </Modal.Body>

//                 <Modal.Footer>
//                     <Button onClick={handleS}
//                         disabled={!(!!title && !!description)}
//                     >
//                         {changableTask ? "Save changes" : "Add task"}
//                     </Button>
//                     <Button onClick={() => onHide()}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     )
// }

// AddOrEditTaskModal.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//     disabled: PropTypes.bool,
//     onHide: PropTypes.func.isRequired,
//     changableTask: PropTypes.object
// }


// const mapStateToProps = (state) => {
//     const {
//         title,
//         description,
//         date
//     } = state.addOrEditTaskModalState;

//     return {
//         title,
//         description,
//         date
//     }

// }

// const mapDispatchToProps = (dispatch) => {
//     return {

//     }
// }

// const AddOrEditTaskModalRedux = connect(mapStateToProps, mapDispatchToProps)(AddOrEditTaskModal);


// export default AddOrEditTaskModalRedux;