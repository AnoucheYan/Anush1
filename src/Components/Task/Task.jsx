import React from 'react';
import styles from './task.module.css';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const Task = ( {task, handleDelTask} ) => {
    return(
        <div className={styles.task}>

            <div className="d-flex justify-content-end">
                <input type="checkbox" />
            </div>

            <div className="">
                <p className = {styles.parMargin}> 
                    {task.title}
                </p>
            </div>
            
            <div>
                <Button
                    className="w-auto"
                    variant = "danger"
                    onClick = { () => handleDelTask(task._id) }
                >
                    <FontAwesomeIcon icon = {faTrash} />
                </Button>
            </div>          
        </div>
    )
}

export default Task;