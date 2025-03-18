import React, { useState, useEffect } from 'react';
import { FormData } from '../types';

interface DataTileProps {
  title: string;
  data: FormData;
  isNew: boolean;
}

const DataTile: React.FC<DataTileProps> = ({ title, data, isNew }) => {
  const [highlight, setHighlight] = useState(isNew);

  useEffect(() => {
    if (isNew) {
      setHighlight(true);
      const timer = setTimeout(() => {
        setHighlight(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isNew, data]);

  return (
    <div
      className={`p-4 rounded-lg shadow transition-all duration-500 ${
        highlight
          ? 'bg-yellow-100 border-2 border-yellow-400'
          : 'bg-white border border-gray-200'
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{data.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Age</p>
          <p className="font-medium">{data.age}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{data.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Gender</p>
          <p className="font-medium">{data.gender}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Country</p>
          <p className="font-medium">{data.country}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Terms & Conditions</p>
          <p className="font-medium">
            {data.termsAccepted ? 'Accepted' : 'Not Accepted'}
          </p>
        </div>

        {data.picture && (
          <div>
            <p className="text-sm text-gray-500">Profile Picture</p>
            <img
              src={data.picture}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full mt-1 border border-gray-200"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTile;
