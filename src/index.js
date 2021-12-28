const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title = '', url = '', techs = [] } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title = '', url = '', techs = [] } = request.body;
  const updatedRepository = request.body;

  repositoryIndex = repositories.findindex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }
   const updatedRepository = {
    ...repository,
    title,
    url,
    techs
  };

  const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
 const { id } = request.params;
  const repository = repositories.find(repository => repository.id === id);
  if (!repository)
    return response.status(400).json({
      message: 'repository not found'
    });
  const filteredRepositories = repositories.filter(repository => repository.id !== id);
  repositories = filteredRepositories;
  return response.status(204).json({
    message: 'repository has been successfully deleted'
  });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryToAddLike = repositories.find(repository => repository.id === id);
  if (!repositoryToAddLike)
    return response.status(400).json({
      message: 'repository not found'
    });
  repositoryToAddLike.likes++;
  repositories = repositories.map(repository => {
    if (repository.id === id)
      return repositoryToAddLike;
    else
      return repository;
  });
  return response.status(200).json(repositoryToAddLike);
});

module.exports = app;
