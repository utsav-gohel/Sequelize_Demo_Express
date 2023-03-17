const db = require("../models");
const { Sequelize, Op, QueryTypes } = require("sequelize");
const Users = db.users;
const Posts = db.posts;
var addUser = async (req, res) => {
  let data = await Users.create({ name: "utsav", email: "abcd", gender: "M" });
  console.log(data.dataValues);
  //   data.destroy();
  res.status(200).json({ data });
};
var crudOperation = async (req, res) => {
  //inserting the data
  // let data = await Users.create({ name: "xi", email: "xi", gender: "F" });
  // res.status(200).json({ data });
  //updating the data
  // let data = await Users.update(
  //   { email: "abcd@gmail.com" },
  //   {
  //     where: {
  //       id: 1,
  //     },
  //   }
  // );
  //deleting the data
  // let data = await Users.destroy({
  //   where: {
  //     id: 7,
  //   },
  // });
  //truncate table
  // let data = await Users.destroy({
  //   truncate: true,
  // });
  //insert bulkdata
  // const data = await Users.bulkCreate([
  //   { name: "utsv", email: "test@bulls.com", gender: "M" },
  //   { name: "utsv", email: "test@bulls.com", gender: "M" },
  //   { name: "utsv", email: "test@bulls.com", gender: "M" },
  //   { name: "utsv", email: "test@bulls.com", gender: "M" },
  // ]);
  // find All data
  // let data = await Users.findAll({});
  //find particular data
  // let data = await Users.findAll({
  //   where: {
  //     id: 5,
  //   },
  // });
  //display particular data
  // let data = await Users.findAll({
  //   attributes: ["name", "email"],
  // });
  //exclude and include fields
  // let data = await Users.findAll({
  //   attributes: {
  //     exclude: ["createdAt", "updatedAt"],
  //   },
  // });
  //find particular query
  // let data = Users.findAll({
  //   where: {
  //     email: {
  //       [Op.like]: "%xi%",
  //     },
  //   },
  // });
  // res.status(200).json({ data });
};

//find data by query
let finderData = async (req, res) => {
  // let data = await Users.findByPk(5);
  // res.status(200).json({ data });

  // let data = await Users.findAndCountAll({
  //   where: {
  //     email: "test@bulls.com",
  //   },
  // });
  res.status(200).json({ data });
};

let validationController = async (req, res) => {
  // let data = await Users.create({
  //   name: "utsav",
  //   email: "utsvxi@gmail.com",
  //   gender: "M",
  // });
  // res.status(200).json({ data });
};

let rawQuery = async (req, res) => {
  // let users = await db.sequelize.query("Select * from users where name = ?", {
  //   type: QueryTypes.SELECT,
  //   replacements: ["utsav"],
  // });
  let users = await db.sequelize.query(
    "Select * from users where email LIKE :checkEmail",
    {
      type: QueryTypes.SELECT,
      replacements: { checkEmail: "%xi" },
    }
  );
  res.status(200).json({
    data: "Raw Query",
    record: users,
  });
};

let oneToOne = async (req, res) => {
  let data = await Users.findAll({});
  res.status(200).json({ data });
};

module.exports = {
  addUser,
  crudOperation,
  finderData,
  validationController,
  rawQuery,
  oneToOne,
};
