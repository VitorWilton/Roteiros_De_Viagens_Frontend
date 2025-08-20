// src/App.jsx
import React, { useState, useEffect } from 'react';
import { getItineraries } from './api/itineraryApi';
import ItineraryForm from './components/ItineraryForm'; // Importa o novo componente

function App() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Novo estado para alternar a exibição

  const userId = 1;

  const fetchItineraries = async () => {
    try {
      const data = await getItineraries(userId);
      setItineraries(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, [userId]);

  const handleItineraryCreated = (newItinerary) => {
    // Adiciona o novo roteiro à lista sem precisar recarregar
    setItineraries([...itineraries, newItinerary]);
    setShowForm(false); // Volta para a lista
  };

  if (loading) {
    return <div>Carregando roteiros...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro ao carregar os dados. Verifique o console do navegador.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Meus Roteiros de Viagem</h1>
      <button 
        onClick={() => setShowForm(!showForm)}
        style={{ padding: '10px', marginBottom: '20px', cursor: 'pointer' }}
      >
        {showForm ? 'Voltar para a lista' : 'Criar Novo Roteiro'}
      </button>

      {showForm ? (
        <ItineraryForm onItineraryCreated={handleItineraryCreated} userId={userId} />
      ) : (
        itineraries.length === 0 ? (
          <p>Nenhum roteiro encontrado. Que tal criar um novo?</p>
        ) : (
          <ul>
            {itineraries.map(itinerary => (
              <li key={itinerary.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <h3>{itinerary.name}</h3>
                <p>Destino: {itinerary.destination}</p>
                <p>De: {itinerary.startDate} até: {itinerary.endDate}</p>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export default App;
