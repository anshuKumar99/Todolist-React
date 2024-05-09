// Importing useContext from react
import { useContext } from "react";

// Importing css from ./AddItems.module.css
import styles from "./AddItems.module.css";

// Importing icons from react-icons
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

// Importing TodoItemsContext from store
import { TodoItemsContext } from "../store/todoItems-store";

function AddItems({ todoItem }) {
  // Using useContext for getting  deleteItem, isTodoCompleted and setEditTaskID from TodoItemsContext
  const { deleteItem, isTodoCompleted, setEditTaskID } =
    useContext(TodoItemsContext);

  // handleDeleteItem method to delete an item from todo list
  const handleDeleteItem = (id) => {
    fetch("https://jsonplaceholder.typicode.com/todos/${id}", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(deleteItem(id));
  };
  return (
    // Todo items Container
    <div
      className={`${styles["items-container"]} ${
        todoItem.completed && styles["item-completed"]
      }`}
    >
      {/* TodoItem row */}
      <div className="row ak-row">
        {/* TodoItem title */}
        <div className="col-6">
          <label htmlFor={todoItem.id}>{todoItem.title}</label>
        </div>

        {/* Checkbox TodoItem completion */}
        <div className="col-2">
          <input
            type="checkbox"
            id={todoItem.id}
            checked={todoItem.completed}
            onChange={() => isTodoCompleted(todoItem.id)}
          />
        </div>

        {/* TodoItem edit button */}
        <div className="col-2">
          <button
            type="button"
            className="btn btn-outline-warning ak-button"
            onClick={() => setEditTaskID(todoItem.id)}
          >
            {/* Edit icon from react-icon */}
            <FaRegEdit />
          </button>
        </div>

        {/* TodoItem delete button */}
        <div className="col-2">
          <button
            type="button"
            className="btn btn-outline-danger ak-button"
            onClick={() => handleDeleteItem(todoItem.id)}
          >
            {/* Delete icon from react-icon */}
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

//exporting AddItems component
export default AddItems;
