import RatingModel from '../models/Ratings.js'

const getAll = (req, res) => {
  RatingModel.find({})
    .then((machines) => res.json(machines))
    .catch((err) => res.json(err));
};

const getOne = (req, res) => {
  const id = req.params.id;
  RatingModel.findById({ _id: id })
    .then((machines) => res.json(machines))
    .catch((err) => res.json(err));
};

const update = (req, res) => {
  const id = req.params.id;

  const updateData = {
    item: req.body.item,
    feedback: req.body.feedback,
    rating: req.body.rating,
  };
  RatingModel.updateOne({ _id: id }, updateData)
    .then((result) => {
      if (result.nModified > 0) {
        return res.json({ message: result });
      } else {
        return res.status(404).json({ message: result });
      }
    })
    .catch((err) => {
      console.error("Error updating rating:", err);
      return res.status(500).json({ error: "Internal server error" });
    });
};

const deleteOne = (req, res) => {
  const _id = req.params.id;
  RatingModel.deleteOne({ _id })
    .then((res) => console.log(res))
    .catch((err) => res.json(err));
};

const create = (req, res) => {
  RatingModel.create(req.body)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};

export const RatingController = { getAll, getOne, create, update, deleteOne};
