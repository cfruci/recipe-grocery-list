import Props from '../../models/props';
import styles from './Card.module.css';

const Card: React.FC<Props> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
