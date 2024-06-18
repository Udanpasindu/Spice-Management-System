import UserModel from "../models/Users.js";



const users = (req, res) => {
    UserModel.find()
      .then(users => res.json(users))
      .catch(err => res.status(500).json({ error: err.message }));
  };
  
  const getEmpUserById = (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
      .then(users => res.json(users))
      .catch(err => res.status(500).json({ error: err.message }));
  };
  
  const updateUser =  (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, req.body, { new: true })
      .then(users => res.json(users))
      .catch(err => res.status(500).json({ error: err.message }));
  };
  
  const deleteUser = (req, res) => {
    const userId = req.params.id;
    UserModel.findByIdAndDelete(userId)
      .then(() => {
        res.json({ success: true, message: 'User deleted successfully' });
      })
      .catch(err => {
        res.status(500).json({ success: false, message: err.message });
      });
  };
  
  const createUser =  (req, res) => {
    UserModel.create(req.body)
      .then(user => res.json(user))
      .catch(err => res.status(500).json({ error: err.message }));
  };
  
  export default {
    users,
    getEmpUserById,
    updateUser,
    deleteUser,
    createUser
  };