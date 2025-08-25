import React, { useState, useEffect } from 'react';
import { getItineraries } from './api/itineraryApi.js';
import ItineraryForm from './components/ItineraryForm.jsx';
import './App.css'; // Importa o arquivo de estilo

function App() {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
    setItineraries([...itineraries, newItinerary]);
    setShowForm(false);
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '1.25rem' }}>Carregando roteiros...</div>;
  }

  if (error) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red', fontSize: '1.25rem' }}>Ocorreu um erro ao carregar os dados. Verifique o console do navegador.</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Meus Roteiros de Viagem</h1>
      <div className="button-container">
        <button 
          onClick={() => setShowForm(!showForm)}
          className="main-button"
        >
          {showForm ? 'Voltar para a lista' : 'Criar Novo Roteiro'}
        </button>
      </div>

      {showForm ? (
        <ItineraryForm onItineraryCreated={handleItineraryCreated} userId={userId} />
      ) : (
        itineraries.length === 0 ? (
          <p className="empty-message">Nenhum roteiro encontrado. Que tal criar um novo?</p>
        ) : (
          <div className="list-container">
            {itineraries.map(itinerary => (
              <div key={itinerary.id} className="list-item">
                <h3>{itinerary.name}</h3>
                <p>Destino: <span>{itinerary.destination}</span></p>
                <p>De: <span>{itinerary.startDate}</span> até: <span>{itinerary.endDate}</span></p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default App;
