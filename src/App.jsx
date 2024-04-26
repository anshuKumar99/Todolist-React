import { useState } from "react";
import "./App.css";
import AddTodo from "./Components/AddTodo";
import AppHeading from "./Components/AppHeading";
import TodoItems from "./Components/TodoItems";
import WelcomeMessage from "./Components/WelcomeMessage";
import { TodoItemsContext } from "./store/todoItems-store";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  const addNewItem = (todoTask, todoDate) => {
    setTodoItems((currValue) => {
      const newTodoItems = [
        ...currValue,
        { name: todoTask, dueDate: todoDate },
      ];
      return newTodoItems;
    });
  };

  const deleteItem = (todoItemName) => {
    const newTodoList = todoItems.filter((item) => item.name !== todoItemName);
    setTodoItems(newTodoList);
  };

  return (
    <TodoItemsContext.Provider
      value={{
        todoItems: todoItems,
        addNewItem: addNewItem,
        deleteItem: deleteItem,
      }}
    >
      <center>
        <AppHeading />
        <AddTodo />
        <hr />
        <WelcomeMessage />
        <TodoItems />
      </center>
    </TodoItemsContext.Provider>
  );
}

export default App;
