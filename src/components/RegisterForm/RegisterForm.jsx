import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { registerUser } from '../../api/userApi.js';
import styles from './RegisterForm.module.css';

function RegisterForm() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            const newUser = await registerUser(formData);
            setMessage('Usuário cadastrado com sucesso! Redirecionando...');
            setIsError(false);
            login(newUser);
            setTimeout(() => {
                navigate('/'); 
            }, 2000);
        } catch (error) {
            setMessage('Erro ao cadastrar usuário. O e-mail pode já estar em uso.');
            setIsError(true);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <Link to="/" className={styles.backLink}>&larr; Voltar para a Lista</Link>
            <h2 className={styles.title}>Criar Nova Conta</h2>
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Nome de Usuário</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className={styles.mainButton}>Cadastrar</button>
            </form>
            {message && (
                <p className={`${styles.message} ${isError ? styles.error : styles.success}`}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default RegisterForm;