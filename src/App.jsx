import React from 'react';
// Imports do React Router para gerenciar a navegação
import { Routes, Route, Link, Outlet } from 'react-router-dom';

// Import das nossas duas novas páginas
// Verifique este caminho, ele precisa sair da pasta 'src' e entrar em 'pages'
import ItineraryListPage from './pages/ItineraryListPage/ItineraryListPage';
import RegisterPage from './pages/RegisterPage';

import './styles/global.css'; // Importa os estilos globais

// Este é o "Layout" principal: a estrutura que se repete em todas as páginas
function Layout() {
    return (
        <div className="container">
            {/* Barra de Navegação */}
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #444', paddingBottom: '15px' }}>
                {/* Link para a página inicial */}
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <h1>Meus Roteiros de Viagem</h1>
                </Link>
                {/* Link para a página de cadastro */}
               
            </nav>

            {/* O <Outlet> é um espaço reservado onde o conteúdo da página atual será renderizado */}
            <main style={{ paddingTop: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
}

// O componente App agora apenas define as regras de navegação
function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Quando o URL for "/", o <Outlet> no Layout vai renderizar a ItineraryListPage */}
                <Route index element={<ItineraryListPage />} />

                {/* Quando o URL for "/register", o <Outlet> no Layout vai renderizar a RegisterPage */}
                <Route path="register" element={<RegisterPage />} />
            </Route>
        </Routes>
    );
}

export default App;