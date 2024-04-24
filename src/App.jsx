import { useState } from "react";
import "./App.css";
import AddTodo from "./Components/AddTodo";
import AppHeading from "./Components/AppHeading";
import TodoItems from "./Components/TodoItems";
import WelcomeMessage from "./Components/WelcomeMessage";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  const onClickAddButton = (todoTask, todoDate) => {
    setTodoItems((currValue) => {
      const newTodoItems = [
        ...currValue,
        { name: todoTask, dueDate: todoDate },
      ];
      return newTodoItems;
    });
  };

  const onDeleteClick = (todoItemName) => {
    const newTodoList = todoItems.filter((item) => item.name !== todoItemName);
    setTodoItems(newTodoList);
  };

  return (
    <center>
      <AppHeading />
      <AddTodo handleAddButtonClick={onClickAddButton} />
      <hr />
      {todoItems.length === 0 && <WelcomeMessage />}
      <TodoItems
        todoItems={todoItems}
        handleDeleteButtonClick={onDeleteClick}
      />
    </center>
  );
}

export default App;
