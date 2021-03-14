import styles from './notFound.module.css';
import Error404 from '../../../assets/images/404.jpg';


const NotFound = () => {
    return(
        <div className={styles.notFoundPage}>
            <img src={Error404} alt="Error 404: Page not found!!!" className={styles.myImg} />
        </div>
    );
}

export default NotFound;