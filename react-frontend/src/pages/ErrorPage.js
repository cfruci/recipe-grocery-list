import MainNav from '../components/MainNav/MainNav';

const ErrorPage = () => {
  return (
    <>
      <MainNav />
      <hr />
      <main>
        <h2>Something went wrong!</h2>
        <p>Please check your URL</p>
      </main>
    </>
  );
};

export default ErrorPage;
