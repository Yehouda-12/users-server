import path from "path";
import fs from "fs/promises";
import { CLIENT_RENEG_LIMIT } from "tls";
const __dirname = path.resolve();
const TODOS_PATH =
process.env.TODOS_PATH || path.join(__dirname, "data", "users.json");

export const getUsers = async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile(TODOS_PATH, "utf-8"));

    res.status(200).send(users);
  } catch (err) {
    console.log(err);
  }
};

export const getUserByID = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const users = JSON.parse(await fs.readFile(TODOS_PATH, "utf-8"));

    const user = users.find((u) => u.id === id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ data: user });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getUserByContry = async (req, res) => {
  try {
    const city = req.query.city;

    const users = JSON.parse(await fs.readFile(TODOS_PATH, "utf-8"));


    const filtered = users.filter((u) => u.city === city);
  
    

    if (!filtered.length) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({ data: filtered });
    }
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (req, res) => {
  try {
    const users = JSON.parse(await fs.readFile(TODOS_PATH, "utf-8"));
    const maxId = users.length > 0 ? Math.max(...users.map((u) => u.id)) : 0;
    const newUser = {
      id: maxId + 1,
      ...req.body,
    };
    users.push(newUser);

    await fs.writeFile(TODOS_PATH, JSON.stringify(users, null, 2));
    res.status(201).json({ data: newUser });
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const users = JSON.parse(await fs.readFile(TODOS_PATH, "utf-8"));

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    users[index] = { ...users[index], id, ...req.body };
    //     const { id: _, ...body } = req.body;
    // users[index] = { ...users[index], ...body };

    await fs.writeFile("users.json", JSON.stringify(users, null, 2));
    res.status(202).json({ updateUser: users[index] });
  } catch (err) {
    console.log(err);
  }
};
export const deleteUserByID = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const users = JSON.parse(await fs.readFile(TODOS_PATH, "utf-8"));

    const filtered = users.filter((u) => u.id != id);

    await fs.writeFile(TODOS_PATH, JSON.stringify(filtered, null, 2));
    users.length > filtered.length
      ? res.status(202).json({ msg: "user delete succefully" })
      : res.status(404).json({ msg: "user not found" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });

    console.log(err);
  }
};
