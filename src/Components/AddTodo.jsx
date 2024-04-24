import { useRef } from "react";
import styles from "./AddTodo.module.css";
import { IoMdAdd } from "react-icons/io";

function AddTodo({ handleAddButtonClick }) {
  const todoTaskElement = useRef();
  const dueDateElement = useRef();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const todoTask = todoTaskElement.current.value;
    const dueDate = dueDateElement.current.value;
    todoTaskElement.current.value = "";
    dueDateElement.current.value = "";
    handleAddButtonClick(todoTask, dueDate);
  };
  return (
    <div className={styles["add-items"]}>
      <form className="row ak-row" onSubmit={handleOnSubmit}>
        <div className="col-6">
          <input
            type="text"
            placeholder="Enter Todo Task Here"
            className="input"
            ref={todoTaskElement}
          />
        </div>
        <div className="col-4">
          <input type="date" className="input" ref={dueDateElement} />
        </div>
        <div className="col-2">
          <button type="submit" className="btn btn-success ak-button">
            <IoMdAdd />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
