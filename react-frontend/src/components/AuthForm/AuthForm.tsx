import { Form } from 'react-router-dom';
import { useState, useContext } from 'react';

import SignupModal from './SignupModal';
import Card from '../UI/Card';
import { AuthContext } from '../store/auth-context';
import styles from './AuthForm.module.css';

const AuthForm = () => {
  const authCtx = useContext(AuthContext);
  const [emailClicked, setEmailClicked] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [modalIsShowing, setModalIsShowing] = useState(false);
  const emailIsValid = emailClicked && emailInput.includes('@');

  // const [passwordClicked, setPasswordClicked] = useState(false);
  // const [passwordInput, setPasswordInput] = useState('');
  // const passwordIsValid = passwordClicked && passwordInput.length > 4;

  const authIsValid = emailIsValid;
  // && passwordIsValid;

  const logInHandler = () => {
    authCtx.logIn();
  };

  const emailInputHandler = (event: any) => {
    setEmailInput(event.target.value);
  };

  const emailBlurHandler = () => {
    setEmailClicked(true);
  };

  const showSignUpModal = () => {
    setModalIsShowing(true);
  };

  // const passwordInputHandler = (event: any) => {
  //   setPasswordInput(event.target.value);
  // };

  // const passwordBlurHandler = () => {
  //   setPasswordClicked(true);
  // };

  return (
    <>
      <Card>
        <button onClick={authCtx.logIn} className={styles.loginBtn}>
          Fake Log In
        </button>
        <Form method="POST" className={styles.authForm}>
          <div className={styles.inputs}>
            <div className={styles.controls}>
              <input
                type="email"
                name="email"
                placeholder="email"
                value={emailInput}
                onChange={emailInputHandler}
                onBlur={emailBlurHandler}
              />
            </div>
            {/* <div className={styles.controls}>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={passwordInputHandler}
              onBlur={passwordBlurHandler}
              value={passwordInput}
            />
          </div> */}
            <button
              onClick={logInHandler}
              disabled={!authIsValid}
              className={styles.loginBtn}
            >
              See Recipes
            </button>
          </div>
        </Form>
        <button className={styles.newActBtn} onClick={showSignUpModal}>
          Create A New Account
        </button>
      </Card>
      {modalIsShowing ? <SignupModal /> : null}
    </>
  );
};

export default AuthForm;
