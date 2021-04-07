import React, { useCallback, useState } from "react";
import "./App.css";
import { TodoItem } from "./models/TodoItem";
import TodoEditor from "./components/TodoEditor";

const todoItemsDefault: TodoItem[] = [
  {
    id: 1,
    title: "Go to Market",
    description: "Buy ingredients to prepare dinner",
    completed: true,
  },
  {
    id: 2,
    title: "Study",
    description: "Read Algebra and History textbook for the upcoming test",
    completed: false,
  },
  {
    id: 3,
    title: "Sammy's books",
    description: "Go to library to return Sammy's books",
    completed: true,
  },
  {
    id: 4,
    title: "Article",
    description: "Write article on how to use Django with React",
    completed: false,
  },
];

function App() {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoItems, setTodoItems] = useState(todoItemsDefault);
  const [activeItem, setActiveItem] = useState<TodoItem>();
  const [modal, setModal] = useState(false);

  const toggleEditor = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const handleSubmit = useCallback((item?: TodoItem) => {
    alert(`Save: ${JSON.stringify(item)}`);
    setModal(false);
  }, []);

  const handleDelte = useCallback((item: TodoItem) => {
    alert(`Delete: ${JSON.stringify(item)}`);
  }, []);

  const handleCreateItem = useCallback(() => {
    const newItem: TodoItem = {
      title: "",
      description: "",
      completed: false,
    };
    setActiveItem(newItem);
    setModal(true);
  }, []);

  const handleEditItem = useCallback((item: TodoItem) => {
    setActiveItem(item);
    setModal(true);
  }, []);

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => setViewCompleted(true)}
        >
          Complete
        </span>
        <span
          className={viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => setViewCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = todoItems.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => {
              handleEditItem(item);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              handleDelte(item);
            }}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleCreateItem();
                }}
              >
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {modal && activeItem && (
        <TodoEditor
          activeItem={activeItem}
          toggle={toggleEditor}
          onSave={handleSubmit}
        />
      )}
    </main>
  );
}

export default App;
