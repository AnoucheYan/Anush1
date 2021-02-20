import React, {memo} from 'react';
import styles from './task.module.css';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const Task = ({
    task,
    handleDelTask,
    setRemoveTaskId,
    disabled,
    checked
}) => {
    
    return(
        <div className={`${styles.task} ${checked && styles.checked}`}>

            <div className="d-flex justify-content-end">
                <input
                    type="checkbox"
                    onClick={() => setRemoveTaskId(task._id)}
                />
            </div>

            <div className="">
                <p className = {styles.parMargin}> 
                    {task.title}
                </p>
            </div>
            
            <div>
                <Button
                    variant = "danger"
                    onClick = { () => handleDelTask(task._id) }
                    disabled = {disabled}
                >
                    <FontAwesomeIcon icon = {faTrash} />
                </Button>
            </div>          
        </div>
    )
}

export default memo(Task);