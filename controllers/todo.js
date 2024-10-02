export const addTodo = (req, res, next) => {
  // validate user inputs
  // Write todo to database
  // respond to request
  res.json("Todo was added");
};

export const getTodos = (req, res, next) => {
  res.json("All todos");
};

export const updateTodo = (req, res, next) => {
  res.json("Todo updated");
};

export const deleteTodo = (req, res, next) => {
  res.json("Todo deleted");
};
  