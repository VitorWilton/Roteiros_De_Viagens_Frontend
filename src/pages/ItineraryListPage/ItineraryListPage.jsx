import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { getItineraries } from '../../api/itineraryApi';
import ItineraryForm from '../../components/ItineraryForm/ItineraryForm';
import MapComponent from '../../components/MapComponent/MapComponent';
import styles from './ItineraryListPage.module.css';

function ItineraryListPage() {
    const { currentUser } = useUser();
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const userId = currentUser?.id;

    useEffect(() => {
        if (userId) {
            const fetchItineraries = async () => {
                setLoading(true);
                try {
                    const data = await getItineraries(userId);
                    setItineraries(data);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchItineraries();
        } else {
            setLoading(false);
            setItineraries([]);
        }
    }, [userId]);

    const handleItineraryCreated = (newItinerary) => {
        setItineraries(prevItineraries => [...prevItineraries, newItinerary]);
        setShowForm(false);
    };

    return (
        <div>
            {currentUser ? (
                <div className={styles.buttonContainer}>
                    <button onClick={() => setShowForm(!showForm)} className={styles.mainButton}>
                        {showForm ? 'Voltar para a Lista' : 'Criar Novo Roteiro'}
                    </button>
                </div>
            ) : (
                <div className={styles.promptContainer}>
                    <p>Você precisa ter uma conta para criar roteiros.</p>
                    <Link to="/register" className={styles.mainButton}>Criar Conta Agora</Link>
                </div>
            )}

            {showForm ? (
                <ItineraryForm onItineraryCreated={handleItineraryCreated} userId={userId} />
            ) : (
                <>
                    {loading && <div className={styles.centeredMessage}>Carregando roteiros...</div>}
                    {error && <div className={`${styles.centeredMessage} ${styles.error}`}>Ocorreu um erro ao carregar os dados.</div>}
                    {!loading && !error && itineraries.length === 0 && currentUser && (
                        <p className={styles.emptyMessage}>Nenhum roteiro encontrado. Que tal criar um novo?</p>
                    )}
                    <div className={styles.listContainer}>
                        {itineraries.map(itinerary => (
                            <div key={itinerary.id} className={styles.listItem}>
                                <h3>{itinerary.name}</h3>
                                <p>Destino: <span>{itinerary.destination}</span></p>
                                <p>De: <span>{itinerary.startDate}</span> até: <span>{itinerary.endDate}</span></p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className={styles.mapSection}>
                <h2 className={styles.title}>Visão Geral no Mapa</h2>
                <MapComponent />
            </div>
        </div>
    );
}

export default ItineraryListPage;