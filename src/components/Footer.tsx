import { FC } from 'react';
import logo from '/rslogo.png';

const Footer: FC = () => {
  return (
    <footer className="mt-[20px] bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <a
        href="https://github.com/sheritsh"
        className="text-gray-300 hover:text-white transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        Created by<span className="font-semibold">&nbsp;// sheritsh</span>
      </a>
      <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
        <img
          src={logo}
          alt="Course Logo"
          className="h-8 invert hover:opacity-80"
        />
      </a>
    </footer>
  );
};

export { Footer };
