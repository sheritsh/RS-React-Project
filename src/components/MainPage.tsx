import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { DataTile } from './DataTile';

const MainPage: FC = () => {
  const { uncontrolledForm, hookForm, lastAddedType, timestamp } = useSelector(
    (state: RootState) => state.formData
  );

  return (
    <div className="max-w-4xl mx-auto mb-[50vh]">
      <h1 className="text-3xl font-bold mb-6 text-center">React Forms</h1>

      <div className="flex justify-center gap-4 mb-8">
        <Link
          to="/uncontrolled-form"
          className="m-[10px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition select-none"
        >
          Uncontrolled Form
        </Link>
        <Link
          to="/hook-form"
          className="m-[10px] px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transitio select-none"
        >
          React Hook Form
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {uncontrolledForm && (
          <DataTile
            title="Uncontrolled Form Data"
            data={uncontrolledForm}
            isNew={
              lastAddedType === 'uncontrolled' &&
              timestamp !== null &&
              Date.now() - timestamp < 10000
            }
          />
        )}

        {hookForm && (
          <DataTile
            title="React Hook Form Data"
            data={hookForm}
            isNew={
              lastAddedType === 'hook' &&
              timestamp !== null &&
              Date.now() - timestamp < 10000
            }
          />
        )}

        {!uncontrolledForm && !hookForm && (
          <div className="col-span-2 p-6 bg-gray-200 rounded-lg text-center">
            <p className="text-lg text-gray-600">
              No form data available yet. Please submit one of the forms to see
              data here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { MainPage };
