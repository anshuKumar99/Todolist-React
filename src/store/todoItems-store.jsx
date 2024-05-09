import { createContext, useEffect, useReducer, useState } from "react";

export const TodoItemsContext = createContext([
  {
    todoItems: [],
    fetching: false,
    editTaskID: null,
    setEditTaskID: () => {},
    addNewItem: () => {},
    deleteItem: () => {},
    updateItem: () => {},
  },
]);

const todoItemsReducer = (currTodoItems, action) => {
  let newTodoItems = currTodoItems;
  if (action.type === "DELETE_ITEM") {
    newTodoItems = currTodoItems.filter(
      (item) => item.id !== action.payload.todoId
    );
  } else if (action.type === "ADD_ITEM") {
    newTodoItems = [action.payload, ...currTodoItems];
  } else if (action.type === "ADD_INITIAL_ITEMS") {
    newTodoItems = action.payload.items;
  } else if (action.type === "UPDATE_ITEM") {
    newTodoItems = currTodoItems.map((item) =>
      item.id === action.payload.id
        ? { ...item, title: action.payload.title }
        : item
    );
  } else if (action.type === "COMPLETED") {
    newTodoItems = currTodoItems.map((item) =>
      item.id === action.payload.todoId
        ? { ...item, completed: !item.completed }
        : item
    );
  }

  return newTodoItems;
};

const TodoItemsContextProvider = ({ children }) => {
  const [todoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);

  const [fetching, setFetching] = useState(false);

  const [editTaskID, setEditTaskID] = useState(null);

  const addInitialtodoItems = (items) => {
    dispatchTodoItems({
      type: "ADD_INITIAL_ITEMS",
      payload: {
        items: items,
      },
    });
  };

  const addNewItem = (todo) => {
    dispatchTodoItems({
      type: "ADD_ITEM",
      payload: todo,
    });
  };

  const deleteItem = (todoId) => {
    dispatchTodoItems({
      type: "DELETE_ITEM",
      payload: {
        todoId: todoId,
      },
    });
  };

  const updateItem = (newTodo) => {
    dispatchTodoItems({
      type: "UPDATE_ITEM",
      payload: newTodo,
    });
  };

  const isTodoCompleted = (todoId) => {
    dispatchTodoItems({
      type: "COMPLETED",
      payload: {
        todoId: todoId,
      },
    });
  };

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://jsonplaceholder.typicode.com/todos", { signal })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        addInitialtodoItems(data);
        setFetching(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <TodoItemsContext.Provider
      value={{
        todoItems,
        fetching,
        editTaskID,
        setEditTaskID,
        addNewItem,
        deleteItem,
        updateItem,
        isTodoCompleted,
      }}
    >
      {children}
    </TodoItemsContext.Provider>
  );
};

export default TodoItemsContextProvider;
