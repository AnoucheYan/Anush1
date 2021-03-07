import React, {memo} from 'react';
import styles from './task.module.css';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';


const Task = ({
    task,
    handleDelTask,
    setRemoveTaskId,
    disabled,
    checked,
    myClick
}) => {
    
    return(
        <div className={`${styles.task} ${checked && styles.checked}`}>

            <div>
                <div className="d-flex justify-content-end">
                    <input
                        type="checkbox"
                        onChange={() => setRemoveTaskId(task._id)}
                        checked = {checked}
                    />
                </div>

                <div>
                    <p className = {styles.titleStyle}> 
                        {task.title}
                    </p>
                </div>
            </div>

            <div>
                <p className = {styles.parMargin}> 
                    {task.description}
                </p>
            </div>
            
            <div className = "mt-3">
                <Button
                    variant = "danger"
                    onClick = { () => handleDelTask(task._id) }
                    disabled = {disabled}
                >
                    <FontAwesomeIcon icon = {faTrash} />
                </Button>

                <Button
                    variant = "warning"
                    className = "ml-3"
                    onClick = {(e) =>  myClick(e, task)}
                    disabled = {disabled}
                    name = "editTask"
                >
                    <FontAwesomeIcon icon = {faPenAlt} />
                </Button>
            </div>          
        </div>
    )
}

Task.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    handleDelTask: PropTypes.func.isRequired,
    setRemoveTaskId: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired,    
    myClick: PropTypes.func.isRequired
}

export default memo(Task);