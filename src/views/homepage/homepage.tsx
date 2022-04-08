import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";

import { Header, Card } from "~components/index";
import { fetchTodos } from "~modules/todo/actions";
import { RootState } from "~modules/redux-store";

const Homepage: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const onEdit = useCallback(() => null, []);
  const onDelete = useCallback(() => null, []);
  const onAdd = useCallback(() => null, []);
  return (
    <div className="container mx-auto">
      <Header
        title="Simple Todo App"
        description="Powered by hellotoms.com"
        onAdd={onAdd}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {isLoading && "Loading..."}
        {!isLoading &&
          map(data, (todo) => {
            return (
              <Card
                id={todo?.id}
                title={todo.title}
                body={todo.body}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Homepage;
