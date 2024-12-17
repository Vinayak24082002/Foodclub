const Food = require("../models/food");

function foodFilteration(food, payload) {
  const {
    searchStr = "",
    maxPrice = Infinity,
    rating = 0,
    discount = 0,
    vegOnly = false,
  } = payload;
  const search = searchStr.toLowerCase();
  return food.filter(
    (item) =>
      (item.name.includes(search) ||
        item.category.includes(search) ||
        item.description.includes(search)) &&
      item.price <= parseFloat(maxPrice) &&
      item.rating >= parseFloat(rating) &&
      item.discount >= parseFloat(discount) &&
      (!Boolean(vegOnly) ? true : Boolean(item.isVeg))
  );
}

// exports.getAllFoodItems = (req, res) => {
//   Food.find({})
//     .then((food) => {
//       const data = foodFilteration(food, req.params);
//       res.send({ status: "success", food: data });
//     })
//     .catch((err) => {
//       res.send({ message: err });
//     });
// };

// exports.getFoodItemsByRestro = (req, res) => {
//   Food.find({ restroId })
//     .then((food) => {
//       const data = foodFilteration(food, req.params);
//       res.send({ status: "success", food: data });
//     })
//     .catch((err) => {
//       res.send({ message: err });
//     });
// };

exports.getFoodItems = (req, res) => {
  const { restroId = null } = req.params;
  if (restroId) {
    Food.find({ restroId })
      .then((food) => {
        const data = foodFilteration(food, req.params);
        return res.send({ status: "success", food: data });
      })
      .catch((err) => {
        return res.send({ message: err });
      });
  } else {
    Food.find({})
      .then((food) => {
        const data = foodFilteration(food, req.params);
        return res.send({ status: "success", food: data });
      })
      .catch((err) => {
        return res.send({ message: err });
      });
  }
};

exports.addFoodItem = (req, res) => {
  const { name, description, details, price, category, isVeg, image, availableQuantity, discount } = req.body; // prettier-ignore
  const restroId = req.user._id;
  Food.create({
    name,
    description,
    details,
    price,
    category,
    isVeg,
    image,
    availableQuantity,
    discount,
    restroId,
  })
    .then((food) => {
      res.status(201).send({
        food,
        status: "success",
        message: "Food item created successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({ message: "Food item creation failed", ...err });
    });
};

exports.updateFoodItem = (req, res) => {
  // const id = req.params.id || req.body.id;
  const {
    name,
    description,
    details,
    price,
    category,
    isVeg,
    image,
    availableQuantity,
    discount,
  } = req.body;
  Food.findByIdAndUpdate(req.params.id, {
    name,
    description,
    details,
    price,
    category,
    isVeg,
    image,
    availableQuantity,
    discount,
  })
    .then((food) => {
      return res.status(200).send({
        food,
        status: "success",
        message: "Food item updated successfully",
      });
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Food item updation failed", ...err });
    });
};

exports.deleteFoodItem = (req, res) => {
  Food.findByIdAndDelete(req.params.id)
    .then((food) => {
      return res.status(200).send({
        food,
        status: "success",
        message: "Food item deleted successfully",
      });
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: "Food item deletion failed", ...err });
    });
};