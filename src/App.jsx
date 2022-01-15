import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VerCliente from './components/VerCliente'
import IniciarSesion from './layout/IniciarSesion'
import Layout from './layout/Layout'
import EditarCliente from './pages/EditarCliente'
import Inicio from './pages/Inicio'
import LoginForm from './pages/LoginForm'
import NuevoCliente from './pages/NuevoCliente'

function App() {
	console.log(import.meta.env.VITE_API_URL)

	return (
		<>
			<div>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<IniciarSesion />}>
							<Route index element={<LoginForm />} />
						</Route>
						<Route path="/clientes" element={<Layout />}>
							<Route index element={<Inicio />} />
							<Route path="nuevo" element={<NuevoCliente />} />
							<Route path="editar/:id" element={<EditarCliente />} />
							<Route path=":id" element={<VerCliente />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
		</>
	)
}

export default App
