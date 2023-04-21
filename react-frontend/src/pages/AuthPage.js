import { json } from 'react-router-dom';

import AuthForm from '../components/AuthForm/AuthForm';
import SignupModal from '../components/AuthForm/SignupModal';

const AuthPage = () => {
  return (
    <>
      <AuthForm />
      <SignupModal />
    </>
  );
};

export default AuthPage;

export async function action({ request }) {
  const formData = await request.formData();
  const method = request.method;
  const headers = { 'content-type': 'application/json' };
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const response = await fetch('http://localhost:3000', {
    method,
    headers,
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw json({ message: 'login failed', status: 404 });
  }
}
