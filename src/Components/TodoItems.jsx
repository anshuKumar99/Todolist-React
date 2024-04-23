import AddItems from "./AddItems";

const TodoItems = ({ todoItems, handleDeleteButtonClick }) => {
  return (
    <>
      <div>
        {todoItems.map((item) => (
          <AddItems
            key={item.name}
            todoName={item.name}
            todoDate={item.dueDate}
            handleDeleteButtonClick={handleDeleteButtonClick}
          />
        ))}
      </div>
    </>
  );
};

export default TodoItems;
