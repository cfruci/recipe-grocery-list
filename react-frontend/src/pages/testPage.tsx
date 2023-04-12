import { useLoaderData } from 'react-router-dom';

const TestPage: React.FC = () => {
  const data = useLoaderData() as any;
  return data.map((recipe: any) => {
    return <div>{recipe.recipeName}</div>;
  });
};

export default TestPage;
