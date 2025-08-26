import axios from 'axios';


const API_URL = 'http://localhost:8080/api'; 

/**
 * Busca todos os roteiros de um usuário específico.
 * @param {number} userId - O ID do usuário.
 * @returns {Promise<Array>} - Uma lista de roteiros.
 */
export const getItineraries = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/itineraries`, { params: { userId: userId } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar roteiros:", error);
    throw error; // Lança o erro para a página que chamou poder tratar
  }
};

/**
 * Cria um novo roteiro de viagem.
 * @param {object} itineraryData - Objeto contendo todos os dados do roteiro (name, destination, startDate, endDate, userId).
 * @returns {Promise<object>} - O roteiro criado.
 */
export const createItinerary = async (itineraryData) => {
  try {
    
    const response = await axios.post(`${API_URL}/itineraries`, itineraryData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar roteiro:", error);
    throw error;
  }
};