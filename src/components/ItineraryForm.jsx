import React, { useState } from 'react';
import { createItinerary } from '../api/itineraryApi.js';
import './ItineraryForm.css'; // Importa o arquivo de estilo

const ItineraryForm = ({ onItineraryCreated, userId }) => {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newItinerary = await createItinerary(formData, userId);
      onItineraryCreated(newItinerary);
      setFormData({ name: '', destination: '', startDate: '', endDate: '' });
    } catch (err) {
      setError("Falha ao criar o roteiro. Verifique o console para mais detalhes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Crie um Novo Roteiro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="destination">Destino:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Data de Início:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">Data de Fim:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Criando...' : 'Criar Roteiro'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default ItineraryForm;
