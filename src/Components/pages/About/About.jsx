import { Container, Row, Col } from 'react-bootstrap';
import styles from './about.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faCodeBranch, faMapMarkerAlt, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';


const About = () => {

    return (
        <Container className={styles.aboutContainer}>
            <h1 className="mb-5">ANUSH AGHAMYAN</h1>
            <div className={styles.myContainer}>
                <div className={styles.miniContainer}>
                    <div className={styles.contactContainer}>
                        <div>
                            <div>
                                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                                <span>(+374 96) 920921</span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                                <span>anush.aghamyan@gmail.com</span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faCodeBranch} className="mr-3" />
                                <a href="https://github.com/AnoucheYan" className={styles.gitHub} target="_blank" rel="noreferrer">Anush</a></div>
                            <div>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3" />
                                <span>47 Arshakunyats av. #9, Yerevan, RA</span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faBirthdayCake} className="mr-3" />
                                <span>03․11․1992</span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={styles.miniContainer}>
                    <h5>EDUCATION</h5>
                    <div>
                        <Row className="align-items-center my-3">
                            <Col xs={4}>
                                <b>2021</b>
                            </Col>
                            <Col xs={8}>
                                <div className="d-flex flex-column">
                                    <b>Bitschool</b>
                                    <i>React.js</i>
                                </div>
                            </Col>
                        </Row>

                        <Row className="align-items-center my-3">
                            <Col xs={4}>
                                <b>2020</b>
                            </Col>
                            <Col xs={8}>
                                <div className="d-flex flex-column">
                                    <b>The Russian-Armenian University</b>
                                    <i>Fundamentals of Programming</i>
                                </div>
                            </Col>
                        </Row>

                        <Row className="align-items-center my-3">
                            <Col xs={4}>
                                <b>2019</b>
                            </Col>
                            <Col xs={8}>
                                <div className="d-flex flex-column">
                                    <b>Microsoft Innovation Center Armenia</b>
                                    <i>Programming fundamentals with JavaScript</i>
                                </div>
                            </Col>
                        </Row>

                        <Row className="align-items-center my-3">
                            <Col xs={4}>
                                <b>2013-2015</b>
                            </Col>
                            <Col xs={8}>
                                <div className="d-flex flex-column">
                                    <b>Yerevan State University</b>
                                    <i>Faculty of Economics and Management</i>
                                    <span>Master’s degree of management</span>
                                </div>
                            </Col>
                        </Row>

                        <Row className="align-items-center my-3">
                            <Col xs={4}>
                                <b>2009-2013</b>
                            </Col>
                            <Col xs={8}>
                                <div className="d-flex flex-column">
                                    <b>Yerevan State University</b>
                                    <i>Faculty of Economics</i>
                                    <span>Bachelor’s degree of management</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className={styles.miniContainer}>
                    <h5>WORK EXPERIANCE</h5>
                    <div>
                        <Row className="align-items-center my-3">
                            <Col xs={4}>
                                <b>August 2019 - to present</b>
                            </Col>
                            <Col xs={8}>
                                <div className="d-flex flex-column">
                                    <b>“ARMECONOMBANK” OJSC</b>
                                    <i>Leading specialist of strategy and methodology in strategy and risk management department</i>
                                    <span>
                                        <ul className={styles.responasabilities}>
                                            <li><b>Main activities and responsibilities</b></li>
                                            <li>Bank’s activity analysis</li>
                                            <li>Banking industry analysis</li>
                                            <li>Making reports (monthly, quarterly, yearly)</li>
                                            <li>Macroeconomic data collecting and analyzing</li>
                                            <li>Studying macroeconomic situation in Armenia</li>
                                            <li>Studying customer’s structure and flow</li>
                                            <li>Collecting data related to budgeting</li>
                                        </ul>
                                    </span>
                                </div>
                            </Col>
                        </Row>

                        <Row className="align-items-center my-3">
                            <Col xs={4}>
                                <b>February 2016 - July 2019</b>
                            </Col>
                            <Col xs={8}>
                                <div className="d-flex flex-column">
                                    <b>“ARMECONOMBANK” OJSC</b>
                                    <i>Specialist of strategy and methodology in strategy and risk management department</i>
                                </div>
                            </Col>
                        </Row>

                        <Row className="align-items-center my-3">
                            <Col xs={4}>
                                <b>July 2015 - January 2016</b>
                            </Col>
                            <Col xs={8}>
                                <div className="d-flex flex-column">
                                    <b>“ARMECONOMBANK” OJSC</b>
                                    <i>Internship in   Strategy and risk management department</i>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>




                <div className={styles.miniContainer}>
                    <h5>TECHNICAL SKILLS</h5>
                    <Row>
                        <Col>
                            <ul className={styles.firstOrderList}>
                                <li>WEB programming
                                    <ul className={styles.secondOrderList}>
                                        <li>HTML</li>
                                        <li>CSS</li>
                                        <li>SASS</li>
                                        <li>Bootstrap</li>
                                        <li>JavaScript</li>
                                        <li>React.js</li>
                                        <li>Redux</li>
                                    </ul>
                                </li>
                            </ul>
                        </Col>

                        <Col>
                            <ul className={styles.firstOrderList}>
                                <li>Microsoft Office
                                        <ul className={styles.secondOrderList}>
                                        <li>Word</li>
                                        <li>Excel (including VBA)</li>
                                        <li>PowerPoint</li>
                                    </ul>
                                </li>

                                <li>Data analysis
                                        <ul className={styles.secondOrderList}>
                                        <li>SPSS</li>
                                        <li>EViews</li>
                                    </ul>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>

                <div className={styles.miniContainer}>
                    <h5>LANGUAGE SKILLES</h5>
                    <div>
                        <ul className={styles.languages}>
                            <li>Russian</li>
                            <li>French</li>
                            <li>English</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Container >
    );
}


export default About;