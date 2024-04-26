import { useContext } from "react";
import { TodoItemsContext } from "../store/todoItems-store";
import AddItems from "./AddItems";

const TodoItems = () => {
  const todoItems = useContext(TodoItemsContext).todoItems;
  return (
    <>
      <div>
        {todoItems.map((item) => (
          <AddItems
            key={item.name}
            todoName={item.name}
            todoDate={item.dueDate}
          />
        ))}
      </div>
    </>
  );
};

export default TodoItems;
