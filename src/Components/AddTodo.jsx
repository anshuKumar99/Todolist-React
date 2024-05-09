// Importing useContext, useEffect, useRef, useState from react
import { useContext, useEffect, useRef, useState } from "react";

// Importing css from ./AddTodo.module.css
import styles from "./AddTodo.module.css";

// Importing icons from react-icons
import { IoMdAdd } from "react-icons/io";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";

// Importing TodoItemsContext from store
import { TodoItemsContext } from "../store/todoItems-store";

function AddTodo() {
  // Using useContext to get todoItems, addNewItem, updateItem, and editTaskID  from TodoItemsContext
  const { todoItems, addNewItem, updateItem, editTaskID } =
    useContext(TodoItemsContext);

  // Using useState to get and set isEditing state
  const [isEditing, setIsEditing] = useState(false);

  // Using useRef to get todoTaskElement and userIdElement value
  const todoTaskElement = useRef();
  const userIdElement = useRef();

  // Using useEffect to get todoTaskElement and userIdElement value whenever editTaskID changes
  useEffect(() => {
    if (editTaskID != null) {
      console.log(isEditing);
      setIsEditing(true);
      console.log(isEditing);
      todoItems.map((item) => {
        if (item.id === editTaskID) {
          todoTaskElement.current.value = item.title;
          userIdElement.current.value = item.userId;
        }
      });
    }
  }, [editTaskID]);

  // handleAddSubmit method to add an item in todolist
  const handleAddSubmit = (event) => {
    event.preventDefault();
    const todoTask = todoTaskElement.current.value;
    const userId = userIdElement.current.value;
    todoTaskElement.current.value = "";
    userIdElement.current.value = "";
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        title: todoTask,
        completed: false,
      }),
    })
      .then((res) => res.json())
      .then((todo) => addNewItem(todo));
  };

  // handleEditSubmit method to edit an item from todolist
  const handleEditSubmit = (event) => {
    event.preventDefault();
    console.log("handleEdit" + isEditing);
    const editTodoTask = todoTaskElement.current.value;
    todoTaskElement.current.value = "";
    userIdElement.current.value = "";
    console.log(editTaskID);
    fetch(`https://jsonplaceholder.typicode.com/todos/${editTaskID}`, {
      method: "PUT",
      body: JSON.stringify({
        title: editTodoTask,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        updateItem(res);
      });
    setIsEditing(false);
  };

  return (
    // For adding an item in todoList we are using form to collect data enter by user
    <div className={styles["add-items"]}>
      <form
        className="row ak-row"
        // If isEditing is true then handleEditSubmit will be called else handleAddSubmit will be called
        onSubmit={isEditing ? handleEditSubmit : handleAddSubmit}
      >
        {/* Input Element for entering todo task */}
        <div className="col-6">
          <label htmlFor="title" />
          <input
            type="text"
            id="title"
            placeholder="Enter Todo Task Here"
            className="input"
            // ref is used for storing todoTaskElement value
            ref={todoTaskElement}
          />
        </div>

        {/* Input Element for entering user id */}
        <div className="col-4">
          <label htmlFor="userId" />
          <input
            type="number"
            className="input"
            // ref is used for storing userIdElement value
            ref={userIdElement}
            id="userId"
            placeholder="Enter Your User Id Here"
          />
        </div>
        <div className="col-2">
          {/* submit button to submit form data */}
          <button type="submit" className="btn btn-success ak-button">
            {isEditing ? <MdOutlineSystemSecurityUpdateGood /> : <IoMdAdd />}
          </button>
        </div>
      </form>
    </div>
  );
}

// exporting AddTodo component
export default AddTodo;
