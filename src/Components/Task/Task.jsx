import React, { memo } from 'react';
import styles from './task.module.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt, faCheckCircle, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import isoDate from '../../helpers/IsoDate';
import { Link } from 'react-router-dom';


const Task = ({
    task,
    handleDelTask,
    setRemoveTaskId,
    disabled,
    checked,
    setChangableTask,
    changeStatusThunk
}) => {

    return (
        <div className={`${styles.task} ${checked && styles.checked}`}>

            <div>
                <div className="d-flex justify-content-end">
                    <input
                        type="checkbox"
                        onChange={() => setRemoveTaskId(task._id)}
                        checked={checked}
                    />
                </div>

                <div>
                    <Link to={`/onetask/${task._id}`}>
                        <p className={styles.titleStyle}>
                            {task.title}
                        </p>
                    </Link>
                </div>
            </div>

            <div>
                <p className={styles.parMargin}>
                    {task.description}
                </p>
            </div>

            <div>
                <p className={styles.parMargin}>
                    Dadline: {isoDate(task.date)}
                </p>
            </div>

            <div>
                <p className={styles.parMargin}>
                    Created at: {isoDate(task.created_at)}
                </p>
            </div>

            <div >
                <Button
                    variant="danger"
                    className="m-1"
                    onClick={() => handleDelTask(task._id)}
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>

                <Button
                    variant="warning"
                    className="m-1"
                    onClick={() => setChangableTask(task)}
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={faPenAlt} />
                </Button>

                <Button
                    variant="info"
                    className="m-1"
                    onClick={() => changeStatusThunk(task)}
                    disabled={disabled}
                >
                    <FontAwesomeIcon icon={task.status === "active" ? faHourglassHalf : faCheckCircle} />
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
    setChangableTask: PropTypes.func,
    changeStatusThunk: PropTypes.func.isRequired
}

export default memo(Task);