const db = require("../models");
const { Sequelize, Op, QueryTypes } = require("sequelize");
const post = require("../models/post");
const Users = db.users;
const Posts = db.posts;
const Tags = db.tags;
var addUser = async (req, res) => {
  let data = await Users.create({ name: "utsav", email: "abcd", gender: "M" });
  console.log(data.dataValues);
  //   data.destroy();
  res.status(200).json({ data });
};
var crudOperation = async (req, res) => {
  //inserting the data
  // let data = await Users.create({
  //   name: "xi1",
  //   email: "xi1@uts.com",
  //   gender: "F",
  // });
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

//One to one relationship it will retrive post details of user with user details.
let oneToOne = async (req, res) => {
  let data = await Users.findAll({
    attributes: ["name", "email"],
    include: [
      {
        model: Posts,
        attributes: ["title", ["title", "name"]],
      },
    ],
    where: { id: 2 },
  });
  res.status(200).json({ data });
};

let belongTo = async (req, res) => {
  let data = await Posts.findAll({
    attributes: ["content", "title"],
    include: {
      model: Users,
      attributes: ["name", "email"],
    },
  });
  res.status(200).json({ data });
};

let hasMany = async (req, res) => {
  let data = await Users.findAll({
    attributes: ["name", "email"],
    include: [
      {
        model: Posts,
        attributes: ["title", ["name", "Postname"]],
      },
    ],
    where: {
      id: 2,
    },
  });
  res.status(200).json({
    data,
  });
};

let ManyToMany = async (req, res) => {
  //This is for post to tag -- which post contain which tag
  // let data = await Posts.findAll({
  //   include: [
  //     {
  //       model: Tags,
  //     },
  //   ],
  // });
  //This is for tag to post -- which tag contain which post
  let data = await Tags.findAll({
    include: [
      {
        model: Posts,
      },
    ],
  });
  res.status(200).json({ data });
};
module.exports = {
  addUser,
  crudOperation,
  finderData,
  validationController,
  rawQuery,
  oneToOne,
  belongTo,
  hasMany,
  ManyToMany,
};
