import ARequestModel from '../models/ARequests.js'

const getAll = (req, res) => {
  ARequestModel.find({})
    .then((machines) => res.json(machines))
    .catch((err) => res.json(err));
};

const getOne = (req, res) => {
  const id = req.params.id;
  console.log(id);
  ARequestModel.findById({ _id: id })
    .then((machines) => res.json(machines))
    .catch((err) => res.json(err));
};

const update = (req, res) => {
  const id = req.params.id;
  const updateData = {
    name: req.body.name,
    arid: req.body.arid,
    quantity: req.body.quantity,
    price: req.body.price,
    deadLine: req.body.deadLine,
  };

  ARequestModel.updateOne({ _id: id }, req.body)
    .then((result) => {
      if (result.nModified > 0) {
        return res.json({ message: result });
      } else {
        return res.status(200).json({ message: result });
      }
    })
    .catch((err) => {
      console.error("Error updating Arequest:", err);
      return res.status(500).json({ error: "Internal server error" });
    });
};

const deleteOne = (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  ARequestModel.deleteOne({ _id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
};

const create = (req, res) => {
  console.log(req.body);
  ARequestModel.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};

export const ARequestController = { getAll, getOne, create, update, deleteOne};