import React, { useCallback, useEffect, useState } from "react";

import { Modal, Button } from "~components/index";
import { FormTodo } from "~src/types/form";

interface ModalAddTodoProps {
  onSave?: (values: FormTodo) => void;
  onClose: () => void;
  initialValues?: FormTodo;
  isOpen: boolean;
  isLoadingAction?: boolean;
}

const ModalAddTodo: React.FC<ModalAddTodoProps> = ({
  isOpen,
  onClose,
  onSave,
  initialValues,
  isLoadingAction,
}) => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setUserId(initialValues?.userId);
    setTitle(initialValues?.title);
    setBody(initialValues?.body);
  }, [initialValues]);

  const handleSave = useCallback(() => {
    onSave({
      id: initialValues?.id,
      title,
      body,
      userId,
    });
    setTitle(null);
    setBody(null);
    setUserId(null);
  }, [initialValues, onSave, userId, title, body]);

  return (
    <Modal
      title={initialValues ? "Edit Todo" : "Add Todo"}
      isVisible={isOpen}
      onClose={onClose}
    >
      <form>
        <div className="px-5 pb-5">
          <div className="mb-5">
            <label
              htmlFor="userId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              User ID
            </label>
            <input
              type="text"
              id="userId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter User ID..."
              onChange={({ target }) => setUserId(target.value)}
              defaultValue={initialValues?.userId}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Title..."
              defaultValue={initialValues?.title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Body
            </label>
            <textarea
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Title..."
              onChange={({ target }) => setBody(target.value)}
              defaultValue={initialValues?.body}
              rows={6}
            />
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <Button
            isLoading={isLoadingAction}
            variant="primary"
            onClick={handleSave}
            type="submit"
          >
            Save
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddTodo;
