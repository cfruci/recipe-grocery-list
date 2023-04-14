// tool imports
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

// component imports
import MainNav from '../components/MainNav/MainNav';
import AuthForm from '../components/AuthForm/AuthForm';

// context imports
import { AuthContext } from '../components/store/auth-context';

// COMPONENET BEGINS
const RootLayout = () => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <MainNav />
      <hr />
      <main>{authCtx.loggedIn ? <Outlet /> : <AuthForm />}</main>
    </>
  );
};

export default RootLayout;
