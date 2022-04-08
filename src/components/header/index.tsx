import React from "react";
import { PlusCircle } from "react-feather";

interface HeaderProps {
  title: string;
  description: string;
  onAdd?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, description, onAdd }) => {
  return (
    <div className="py-8">
      <p className="text-3xl font-extrabold">{title}</p>
      <p className="py-3 text-xs font-light">{description}</p>
      <button
        onClick={onAdd}
        type="button"
        className="text-white bg-teal-500 hover:bg-teal-500/80 focus:ring-4 focus:outline-none focus:ring-teal-500 /50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-teal-500/80 dark:focus:ring-teal-500/40 mr-2 mb-2"
      >
        <PlusCircle size={16} className="mr-2" />
        Add Todo
      </button>
    </div>
  );
};

export default Header;
