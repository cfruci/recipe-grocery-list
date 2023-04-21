import { useState } from 'react';

import Card from './Card';
import styles from './Modal.module.css';
import Props from '../../models/props';

export const Backdrop: React.FC = () => {
  const [isShowing, setIsShowing] = useState(false);
  const handleBackdropClick = () => {
    setIsShowing(false);
  };

  return <div onClick={handleBackdropClick} className={styles.backdrop}></div>;
};

export const Overlay: React.FC<Props> = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className={styles.overlay}>
      <Card>{children}</Card>
    </div>
  );
};
