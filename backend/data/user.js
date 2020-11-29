import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@exemple.com",
    password: bcrypt.hashSync("jaoued", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@exemple.com",
    password: bcrypt.hashSync("jaoued", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@exemple.com",
    password: bcrypt.hashSync("jaoued", 10),
  },
];

export default users;
