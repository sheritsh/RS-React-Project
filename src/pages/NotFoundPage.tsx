import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
  return (
    <div
      data-testid="not-found-container"
      className="flex flex-col items-center justify-center flex-grow p-8"
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Страница не найдена</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        data-discover="true"
      >
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
