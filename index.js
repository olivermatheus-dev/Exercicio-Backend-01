import express from "express";
import { v4 as uuid } from "uuid";
const app = express();
app.use(express.json());

const data = [];

app.post("/", (req, res) => {
  const dataCreate = { ...req.body, id: uuid() };
  data.push(dataCreate);
  return res.status(201).json(data);
});

app.get("/", (req, res) => {
  return res.status(200).json(data);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const dataFind = data.find((item) => item.id === id);
  return res.status(200).json(dataFind);
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  let index;
  const dataUpdate = data.find((item, i) => {
    index = i;
    return item.id === id;
  });

  data.splice(index, 1);
  data.push({ ...dataUpdate, ...req.body });

  return res.status(200).json(data);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  let index;
  const elementoEncontrado = data.find((item, i) => {
    index = i;
    return item.id === id;
  });

  if (elementoEncontrado) {
    data.splice(index, 1);
    return res.status(200).json(data);
  } else {
    return res.status(404).json({ message: "Elemento não encontrado" });
  }
});
// app.delete("/", () => {});

app.listen(3030, () => {
  console.log("Server is running in port 3030");
});
