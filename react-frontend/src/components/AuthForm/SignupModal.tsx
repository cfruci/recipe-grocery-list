import { createPortal } from 'react-dom';
import { Form } from 'react-router-dom';

import { Backdrop, Overlay } from '../UI/Modal';
import styles from './SignupModal.module.css';

const SignupModal: React.FC = () => {
  return (
    <>
      {createPortal(<Backdrop />, document.getElementById('backdrop-root'))}
      <Overlay>
        <Form method="POST">
          <h2 className={styles.header}>Create a New Account</h2>
          <div className={styles.controls}>
            <input type="email" placeholder="email" name="email" />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </Form>
      </Overlay>
    </>
  );
};

export default SignupModal;
