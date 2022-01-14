import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({ cliente, cargando }) => {
	const navigate = useNavigate()
	const nuevoClienteSchema = Yup.object().shape({
		nombre: Yup.string()
			.min(3, 'El nombre es muy corto')
			.max(20, 'El nombre es muy largo')
			.required('El nombre del cliente es obligatorio'),
		empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
		email: Yup.string()
			.email('Email no válido')
			.required('El email es obligatorio'),
		telefono: Yup.number()
			.typeError('El número no es valido')
			.integer('Número no válido')
			.positive('Número no válido'),
	})

	const handleSubmit = async values => {
		try {
			let respuesta
			if (cliente.id) {
				//Editando
				const url = 'http://localhost:2999/clientes/' + cliente.id
				respuesta = await fetch(url, {
					method: 'PUT',
					body: JSON.stringify(values),
					headers: {
						'Content-Type': 'application/json',
					},
				})
			} else {
				//Creando
				const url = 'http://localhost:2999/clientes'
				respuesta = await fetch(url, {
					method: 'POST',
					body: JSON.stringify(values),
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}
			await respuesta.json()
			navigate('/clientes')
		} catch (error) {
			console.log(error)
		}
	}

	return cargando ? (
		<Spinner />
	) : (
		<div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
			<h1 className="text-gray-600 font-bold text-xl uppercase text-center">
				{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
			</h1>

			<Formik
				initialValues={{
					nombre: cliente?.nombre ?? '',
					empresa: cliente?.empresa ?? '',
					email: cliente?.email ?? '',
					telefono: cliente?.telefono ?? '',
					notas: cliente?.notas ?? '',
				}}
				enableReinitialize={true}
				onSubmit={async (values, { resetForm }) => {
					await handleSubmit(values)
					resetForm()
				}}
				validationSchema={nuevoClienteSchema}
			>
				{({ errors, touched }) => (
					<Form className="mt-10">
						<div className="mb-4">
							<label className=" text-gray-800" htmlFor="nombre">
								Nombre
							</label>
							<Field
								className="mt-2 block w-full p-3 bg-gray-50"
								id="nombre"
								name="nombre"
								type="text"
								placeholder="Nombre del Cliente"
							/>
							{errors.nombre && touched.nombre && (
								<Alerta>{errors.nombre}</Alerta>
							)}
						</div>
						<div className="mb-4">
							<label className=" text-gray-800" htmlFor="empresa">
								Empresa
							</label>
							<Field
								className="mt-2 block w-full p-3 bg-gray-50"
								id="empresa"
								name="empresa"
								type="text"
								placeholder="Empresa del Cliente"
							/>
							{errors.empresa && touched.empresa && (
								<Alerta>{errors.empresa}</Alerta>
							)}
						</div>
						<div className="mb-4">
							<label className=" text-gray-800" htmlFor="email">
								E-mail
							</label>
							<Field
								className="mt-2 block w-full p-3 bg-gray-50"
								id="email"
								name="email"
								type="email"
								placeholder="E-mail del Cliente"
							/>
							{errors.email && touched.email && <Alerta>{errors.email}</Alerta>}
						</div>
						<div className="mb-4">
							<label className=" text-gray-800" htmlFor="telefono">
								Teléfono
							</label>
							<Field
								className="mt-2 block w-full p-3 bg-gray-50"
								id="telefono"
								name="telefono"
								type="tel"
								placeholder="Teléfono del Cliente"
							/>
							{errors.telefono && touched.telefono && (
								<Alerta>{errors.telefono}</Alerta>
							)}
						</div>
						<div className="mb-4">
							<label className=" text-gray-800" htmlFor="notas">
								Notas
							</label>
							<Field
								as="textarea"
								className="mt-2 block w-full p-3 bg-gray-50 h-40"
								id="notas"
								name="notas"
								type="text"
								placeholder="Notas del Cliente"
							/>
						</div>
						<input
							className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
							type="submit"
							value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
						/>
					</Form>
				)}
			</Formik>
		</div>
	)
}

Formulario.defaultProps = {
	cliente: {},
	cargando: false,
}

export default Formulario
