export const auth = (req, res, next) => {
  req.user = {
    id: 1,
    role: "admin",
  };
  next();
};