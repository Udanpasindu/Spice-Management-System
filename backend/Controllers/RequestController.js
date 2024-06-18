import RequestModel from '../models/Requests.js'

const getAll = (req, res) => {
  RequestModel.find({})
    .then((machines) => res.json(machines))
    .catch((err) => res.json(err));
};

const getOne = (req, res) => {
  const id = req.params.id;
  console.log(id);
  RequestModel.findById({ _id: id })
    .then((machines) => res.json(machines))
    .catch((err) => res.json(err));
};

const update = (req, res) => {
  const id = req.params.id;
  const updateData = {
    name: req.body.name,
    rid: req.body.rid,
    quantity: req.body.quantity,
    price: req.body.price,
    deadLine: req.body.deadLine,
  };

  RequestModel.updateOne({ _id: id }, req.body)
    .then((result) => {
      if (result.nModified > 0) {
        return res.json({ message: result });
      } else {
        return res.status(200).json({ message: result });
      }
    })
    .catch((err) => {
      console.error("Error updating request:", err);
      return res.status(500).json({ error: "Internal server error" });
    });
};

const deleteOne = (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  RequestModel.deleteOne({ _id })
    .then((res) => console.log(res))
    .catch((err) => res.json(err));
};

const create = (req, res) => {
  RequestModel.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};

export const RequestController = { getAll, getOne, create, update, deleteOne};

