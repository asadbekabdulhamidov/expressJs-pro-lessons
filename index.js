import express from "express";

const PORT = 3000;

const app = express();

app.use(express.json());

// Vaqtinchalik ma'lumotlar ombori (Xotirada)
let users = [
  { id: 1, name: "Ali", role: "Developer" },
  { id: 2, name: "Vali", role: "Designer" },
];

// get methodi
app.get("/api/users", (req, res) => {
  res.json({
    success: true,
    count: users.length,
    data: users,
  });
});

app.listen(PORT, () => {
  console.log(`server ishlamoqda : http://localhost:${PORT}`);
});

// create POST methdodi yangi user qoshish

app.post("/api/users", (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({
      success: false,
      message: "iltimos nama va rol maydonlarini toldiring",
    });
  }

  const newUser = {
    id: users.length === 0 ? 1 : users.at(-1).id + 1,
    name,
    role,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser,
  });
});

//update user PUT methodi

app.put("/api/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const { role, name } = req.body;

  const findUser = users.find((user) => user.id === userId);

  if (!findUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (name) findUser.name = name;
  if (role) findUser.role = role;

  res.json({
    success: true,
    message: "foydalanuvchi malumoti yangilandi",
    data: findUser,
  });
});

app.delete("/api/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const deleteUser = users.splice(userIndex, 1);

  res.json({
    success: true,
    message: "Foydalanuvchi ochirildi",
    data: deleteUser[0],
  });
});

app.listen(PORT, () => {
  console.log(`sever ishlamoqda http://localhost:${PORT}`);
});
