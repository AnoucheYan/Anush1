import React from 'react';
import styles from './oneTask.module.css';
import IsoDate from '../../../helpers/IsoDate';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import AddOrEditTaskModal from '../../AddOrEditTaskModal/AddOrEditTaskModal';
import Loading from '../../Loading/Loading';


class OneTask extends React.Component{
    state = {
        oneTask: null,
        showEditModal: false,
        loading: false
    }

    goBack = () => {
        const {history} = this.props;
        history.push('/')
    }

    DeleteOneTask = () => {
        const {id} = this.props.match.params;

        this.setState ({
            loading: true
        })

        fetch("http://localhost:3001/task/"+id,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data =>{
            if(data.error){
                throw data.error
            }
            const {history} = this.props;
            history.push('/')        
        })
        .catch(error => {
            console.log("error: ",error);
        })
        .finally(() => {
            this.setState({
                loading: false
            })
        });
    }

    showHideEditModal = () => {
        this.setState({
            showEditModal: !this.state.showEditModal
        })
    }

    edit = (dataObj) => {
        this.setState ({
            loading: true
        })

        fetch("http://localhost:3001/task/" + dataObj._id, {
            method: "PUT",
            body: JSON.stringify(dataObj),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                throw data.error
            }
    
            this.setState({
                oneTask: data,
                showEditModal: false
            });
        })
        .catch(error =>{
            console.log("error: ",error);
        })
        .finally(() => {
            this.setState({
                loading: false
            })
        });
    }

    componentDidMount () {
        const {id} = this.props.match.params;
        this.setState ({
            loading: true
        })
        fetch(`http://localhost:3001/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data.error){
                throw data.error;
            }
            this.setState({
                oneTask: data
            });
        })
        .catch(error => {
            this.props.history.push("/404");
            console.log("error: ", error);
        })
        .finally(() => {
            this.setState({
                loading: false
            })
        });
    }

    render () {
        const {oneTask, showEditModal, loading} = this.state;

        if(!oneTask) {
            return (
                <Loading />
            )
        }
        
        return (
            <>
                <div className={styles.oneTaskContainer}>
                    <div className={styles.oneTask}>
                        <Button onClick={this.goBack}>
                            Back
                        </Button>
                        <h1>{oneTask.title}</h1>
                        <p>{oneTask.description}</p>
                        <p>Deadline: <span className={styles.date}>{IsoDate(oneTask.date)}</span></p>
                        <p>Created at: <span className={styles.date}>{IsoDate(oneTask.created_at)}</span></p>
                        <p>Updated at: <span className={styles.date}>{IsoDate(oneTask.updated_at)}</span></p>
                        <div className = "mt-3">
                            <Button
                                variant = "danger"
                                onClick = {() => this.DeleteOneTask()}
                            >
                                <FontAwesomeIcon icon = {faTrash} />
                            </Button>

                            <Button
                                className = "ml-3"
                                variant = "warning"
                                onClick = {this.showHideEditModal}
                            >
                                <FontAwesomeIcon icon = {faPenAlt} />
                            </Button>
                        </div>
                    </div>    
                </div>
                {
                    showEditModal && <AddOrEditTaskModal
                        changable = {oneTask}
                        onHide = {this.showHideEditModal}
                        onSubmit = {this.edit}
                    />
                }
                {
                    loading && <Loading />
                }
            </>
        );
    }    
};

export default OneTask;