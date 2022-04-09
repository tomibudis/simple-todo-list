import React from "react";
import { Edit3, Trash2 } from "react-feather";

interface CardProps {
  id: number;
  title: string;
  body: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, title, body, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-gradient-to-r from-teal-200/50 to-lime-200/50 rounded-md">
      <div className="flex justify-between align-middle">
        <p className="font-bold">{title}</p>
        <div className="flex gap-3">
          <Edit3
            size={16}
            className="cursor-pointer hover:text-teal-500"
            onClick={() => onEdit(id)}
          />
          <Trash2
            size={16}
            className="cursor-pointer hover:text-red-500"
            onClick={() => onDelete(id)}
          />
        </div>
      </div>
      <p className="text-sm leading-6">{body}</p>
    </div>
  );
};

export default Card;
