import React from 'react';
import styles from './oneTask.module.css';
import IsoDate from '../../../helpers/IsoDate';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt } from '@fortawesome/free-solid-svg-icons';


class OneTask extends React.Component{
    state = {
        oneTask: null
    }

    componentDidMount () {
        const {id} = this.props.match.params;
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
            console.log("error: ", error);
        })
    }

    historyTest = () => {
        const {history} = this.props;
        history.push('/')
    }

    DeleteOneTask = () => {
        const {id} = this.props.match.params;
        fetch("http://localhost:3001/task/"+id,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data =>{
            if(data.error){
                throw data.error
            }
            // let tasks = [...this.state.tasks];

            // tasks = tasks.filter(item => item._id !== id);
    
            // this.setState({
            //     tasks
            // });
            const {history} = this.props;
            history.push('/')        
        })
        .catch(error => {
            console.log("error: ",error);
        });
    }

    render () {
        const {oneTask} = this.state;
        if(!oneTask){
            return (
                <div>
                    <span>Loading...</span>
                </div>
            )
        }


        return (
            <div className={styles.oneTaskContainer}>
                <div className={styles.oneTask}>
                    <Button onClick={this.historyTest}>
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
                            variant = "warning"
                        >
                            <FontAwesomeIcon icon = {faPenAlt} />
                        </Button>
                    </div>
                </div>    
            </div>
        );
    }    
};

export default OneTask;