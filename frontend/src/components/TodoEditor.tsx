import React, { useCallback, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";
import { TodoItem } from "../models/TodoItem";

export type TodoEditorPorps = {
  activeItem: TodoItem;
  toggle: React.MouseEventHandler<any>; //ModalProps['toggle'],
  onSave: (item?: TodoItem) => void;
};

const TodoEditor: React.FC<TodoEditorPorps> = ({
  activeItem,
  toggle,
  onSave,
}) => {
  const [item, setItem] = useState(activeItem);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let { name, value } = e.target;
      setItem({ ...item, [name]: value });
    },
    [item]
  );

  const handleCompletedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let { checked: completed } = e.target;
      setItem({ ...item, completed });
    },
    [item]
  );

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="todo-title">Title</Label>
            <Input
              type="text"
              id="todo-title"
              name="title"
              value={item.title}
              onChange={handleTextChange}
              placeholder="Enter Todo Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="todo-description">Description</Label>
            <Input
              type="text"
              id="todo-description"
              name="description"
              value={item.description}
              onChange={handleTextChange}
              placeholder="Enter Todo description"
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="completed"
                checked={item.completed}
                onChange={handleCompletedChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(item)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TodoEditor;
