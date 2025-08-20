// src/api/itineraryApi.js
import axios from 'axios';

// A URL base da sua API em Java.
const API_URL = 'http://localhost:8080/api'; 

export const getItineraries = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/itineraries`, { params: { userId: userId } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar roteiros:", error);
    return [];
  }
};

/**
 * Cria um novo roteiro de viagem.
 * @param {object} itineraryData - Os dados do roteiro (name, destination, etc.).
 * @param {number} userId - O ID do usuário associado ao roteiro.
 * @returns {Promise<object>} - O roteiro criado.
 */
export const createItinerary = async (itineraryData, userId) => {
  try {
    // Faz a requisição POST para o endpoint de criação
    const response = await axios.post(`${API_URL}/itineraries`, itineraryData, {
      params: { userId: userId }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar roteiro:", error);
    // Lança o erro para que o componente React possa tratá-lo
    throw error;
  }
};
