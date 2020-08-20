import React, { useState, useEffect } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: `https://github.com/Rocketseat/repository${Date.now()}`,
      title: `New Repository ${Date.now()}`,
      techs: ['Node', 'Express', 'TypeScript'],
    });

    const newRepository = response.data;

    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const newRepositories = repositories.filter(
        (repository) => repository.id !== id
      );
      setRepositories(newRepositories);
    } else {
      console.log('Something went wrong, this repository could not be removed');
    }
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => {
          return (
            <div key={repository.id}>
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            </div>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
