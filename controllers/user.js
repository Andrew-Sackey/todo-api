export const register = (req, res, next) => {
  res.json("User registered");
}

export const login = (req, res, next) => {
  res.json("User logged in");
}

export const logout = (req, res, next) => {
  res.json("User logged out");
}
