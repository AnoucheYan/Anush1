import { Dropdown, DropdownButton, Form, Button, } from 'react-bootstrap';
import styles from './search.module.css';
import DatePicker from 'react-datepicker';


const Search = () => {
    return (
        <>
            <div className={styles.container}>
                <h1>Search</h1>
                <div className={styles.search}>
                    <div className={styles.drops}>

                        <div>
                            <Form.Control
                                name="tytle"
                                type="text"
                                placeholder="Type searching text!"
                            />
                        </div>

                        <div>
                            <DropdownButton id="dropdown-basic-button" title="Status">
                                <Dropdown.Item>Done</Dropdown.Item>
                                <Dropdown.Item>Active</Dropdown.Item>
                            </DropdownButton>
                        </div>

                        <div>
                            <DropdownButton id="dropdown-basic-button" title="Sort">
                                <Dropdown.Item>A-Z</Dropdown.Item>
                                <Dropdown.Item>Z-A</Dropdown.Item>
                                <Dropdown.Item>Creation date oldest</Dropdown.Item>
                                <Dropdown.Item>Creation date newest</Dropdown.Item>
                                <Dropdown.Item>Completion date oldest</Dropdown.Item>
                                <Dropdown.Item>Completion date newest</Dropdown.Item>
                            </DropdownButton>
                        </div>

                    </div>

                    <div className={styles.datePickerContainer}>
                        <div>
                            <div className={styles.datePicker}>
                                Create lte: <DatePicker />
                            </div>
                            <div className={styles.datePicker}>
                                Create gte: <DatePicker />
                            </div>
                            <div className={styles.datePicker}>
                                Complete lte: <DatePicker />
                            </div>
                            <div className={styles.datePicker}>
                                Complete gte: <DatePicker />
                            </div>
                        </div>

                        <div>
                            <Button variant="info"> Search </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Search;