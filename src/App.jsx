import AddTodo from "./Components/AddTodo";
import AppHeading from "./Components/AppHeading";
import "./App.css";
import TodoItems from "./Components/TodoItems";
import { useState } from "react";
import WelcomeMessage from "./Components/WelcomeMessage";

function App() {
  // const initialTodoItems = [
  //   {
  //     name: "Buy Milk",
  //     dueDate: "5/04/2024",
  //   },
  //   {
  //     name: "Get a Job",
  //     dueDate: "15/04/2024",
  //   },
  //   {
  //     name: "Join Job",
  //     dueDate: "25/04/2024",
  //   },
  // ];

  const [todoItems, setTodoItems] = useState([]);

  const onClickAddButton = (todoTask, todoDate) => {
    console.log(todoTask + todoDate);
    const newTodoItems = [...todoItems, { name: todoTask, dueDate: todoDate }];
    setTodoItems(newTodoItems);
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
