const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO List
  const { title } = request.query;

  const results = title
    ? repositories.filter(repository => repository.title.includes(title))
    : repositories;

  return response.json(results);
});

app.post("/repositories", (request, response) => {
  // TODO Create
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0};

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO Update
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO Delete
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO Like
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const repository = {
    id: repositories[repositoryIndex].id,
    title: repositories[repositoryIndex].title,
    url: repositories[repositoryIndex].url,
    techs: repositories[repositoryIndex].techs,
    likes: repositories[repositoryIndex].likes + 1
  }

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

module.exports = app;

//app.listen(3334, () => {
//  console.log('back-end started!');
//});
