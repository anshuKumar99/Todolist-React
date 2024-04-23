import styles from "./AddItems.module.css";
import { MdDelete } from "react-icons/md";

function AddItems({ todoName, todoDate, handleDeleteButtonClick }) {
  return (
    <div className={styles["items-container"]}>
      <div className="row ak-row">
        <div className="col-6">{todoName}</div>
        <div className="col-4">{todoDate}</div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger ak-button"
            onClick={() => handleDeleteButtonClick(todoName)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItems;
