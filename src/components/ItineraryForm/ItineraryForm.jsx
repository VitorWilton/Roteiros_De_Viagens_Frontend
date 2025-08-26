import React, { useState } from 'react';
import { createItinerary } from '../../api/itineraryApi.js';
import styles from './ItineraryForm.module.css';

const ItineraryForm = ({ onItineraryCreated, userId }) => {
    const [formData, setFormData] = useState({
        name: '',
        destination: '',
        startDate: '',
        endDate: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const newItinerary = await createItinerary({ ...formData, userId });
            
            onItineraryCreated(newItinerary); 
            
            // Limpa o formulário para a próxima criação
            setFormData({ name: '', destination: '', startDate: '', endDate: '' });
        } catch (err) {
            setError('Falha ao criar o roteiro. Tente novamente.');
            console.error(err);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Crie um Novo Roteiro</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="destination">Destino:</label>
                    <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="startDate">Data de Início:</label>
                    <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="endDate">Data de Fim:</label>
                    <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required />
                </div>
                <button type="submit" className={styles.submitButton}>Criar Roteiro</button>
            </form>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
    );
};

export default ItineraryForm;