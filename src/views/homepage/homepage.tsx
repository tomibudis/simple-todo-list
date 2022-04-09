import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";

import { Header, Card } from "~components/index";

import {
  createTodo,
  deleteTodo,
  editTodo,
  fetchTodos,
} from "~modules/todo/actions";
import { RootState } from "~modules/redux-store";
import useDisclosure from "~src/hooks/use-disclosure";
import ModalAddTodo from "./modal-add-todo";
import { FormTodo } from "~src/types/form";

const Homepage: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, data, isLoadingAdd, isLoadingEdit } = useSelector(
    (state: RootState) => state.todos
  );
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedTodo, setSelectedTodo] = useState<FormTodo>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const onEdit = useCallback(
    (data, index) => {
      setSelectedTodo({ ...data, index });
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(
    (todoId: number, index: number) => {
      dispatch(deleteTodo(todoId, index));
    },
    [dispatch]
  );

  const onSave = useCallback(
    (values: FormTodo) => {
      if (values.id || selectedTodo?.index) {
        dispatch(
          editTodo({ ...values, index: selectedTodo.index }, Number(values.id))
        );
      } else {
        dispatch(createTodo(values));
      }
      setSelectedTodo(null);
      onClose();
    },
    [dispatch, onClose, selectedTodo]
  );

  return (
    <div className="container mx-auto">
      <Header
        title="Simple Todo App"
        description="Powered by hellotoms.com"
        onAdd={() => {
          setSelectedTodo(null);
          onOpen();
        }}
      />

      <ModalAddTodo
        initialValues={selectedTodo || null}
        isOpen={isOpen}
        onClose={() => {
          setSelectedTodo(null);
          onClose();
        }}
        onSave={onSave}
        isLoadingAction={isLoadingAdd || isLoadingEdit}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {isLoading && "Loading..."}
        {!isLoading &&
          map(data, (todo: FormTodo, index) => {
            return (
              <Card
                key={index}
                id={Number(todo?.id)}
                title={todo?.title}
                body={todo?.body}
                onEdit={() => onEdit(todo, index)}
                onDelete={() => onDelete(todo?.id, index)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Homepage;
