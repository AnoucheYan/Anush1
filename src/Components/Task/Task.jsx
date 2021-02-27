import React, {memo} from 'react';
import styles from './task.module.css';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';


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
                    onChange={() => setRemoveTaskId(task._id)}
                    checked = {checked}
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

Task.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }),
    handleDelTask: PropTypes.func.isRequired,
    setRemoveTaskId: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired
}

export default memo(Task);