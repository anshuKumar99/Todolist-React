// Importing createContext, useEffect, useReducer, useState from react
import { createContext, useEffect, useReducer, useState } from "react";

// create context for TodoItemsContext
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

// todoItemsReducer method to update todoItems list
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
  // Using useReducer to get and set todoItems
  const [todoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);

  // Using useState to set and get fetching
  const [fetching, setFetching] = useState(false);

  // Using useState to set and get editTaskID
  const [editTaskID, setEditTaskID] = useState(null);

  // addInitialtodoItems method for adding intial items from api
  const addInitialtodoItems = (items) => {
    dispatchTodoItems({
      type: "ADD_INITIAL_ITEMS",
      payload: {
        items: items,
      },
    });
  };

  // addNewItem method for adding new item
  const addNewItem = (todo) => {
    dispatchTodoItems({
      type: "ADD_ITEM",
      payload: todo,
    });
  };

  // deleteItem method for deleting new item
  const deleteItem = (todoId) => {
    dispatchTodoItems({
      type: "DELETE_ITEM",
      payload: {
        todoId: todoId,
      },
    });
  };

  // updateItem method for updating new item
  const updateItem = (newTodo) => {
    dispatchTodoItems({
      type: "UPDATE_ITEM",
      payload: newTodo,
    });
  };

  // isTodoCompleted method to set todo item is completed
  const isTodoCompleted = (todoId) => {
    dispatchTodoItems({
      type: "COMPLETED",
      payload: {
        todoId: todoId,
      },
    });
  };

  // Using useEffect for fetching todo items from api
  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://jsonplaceholder.typicode.com/todos", { signal })
      .then((response) => response.json())
      .then((data) => {
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

//exporting TodoItemsContextProvider component
export default TodoItemsContextProvider;
