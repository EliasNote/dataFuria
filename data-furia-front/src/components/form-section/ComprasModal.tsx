import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./compras-modal.css";
import CloseIcon from "../../assets/close-button.svg";
import React, { useState } from "react";

export interface Compra {
	id: number;
	nome: string;
	valor: string;
	quantidade: string;
}

const compraSchema = Yup.object().shape({
	nome: Yup.string().required("Campo obrigatório"),
	valor: Yup.number()
		.typeError("Deve ser um número")
		.required("Campo obrigatório")
		.positive("Deve ser positivo"),
	quantidade: Yup.number()
		.typeError("Deve ser um número")
		.required("Campo obrigatório")
		.integer("Deve ser inteiro")
		.positive("Deve ser positivo"),
});

interface ComprasModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (compras: Compra[]) => void;
}

const ComprasModal: React.FC<ComprasModalProps> = ({
	isOpen,
	onClose,
	onSave,
}) => {
	const [compras, setCompras] = useState<Compra[]>([]);

	if (!isOpen) return null;

	const handleClose = () => {
		onSave(compras);
		onClose();
	};

	const handleAddCompra = (
		values: Omit<Compra, "id">,
		resetForm: () => void
	) => {
		const newCompra: Compra = {
			...values,
			id: Date.now(),
		};
		setCompras([...compras, newCompra]);
		resetForm();
	};

	const handleRemoveCompra = (id: number) => {
		setCompras(compras.filter((compra) => compra.id !== id));
	};

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<img
					src={CloseIcon}
					alt="Fechar"
					className="close-button"
					onClick={handleClose}
				/>
				<h3>Registrar Compras</h3>
				<Formik
					initialValues={{
						nome: "",
						valor: "",
						quantidade: "",
					}}
					validationSchema={compraSchema}
					onSubmit={(values, { resetForm }) => {
						handleAddCompra(values as Omit<Compra, "id">, resetForm);
					}}
				>
					{({ errors, touched, submitForm }) => (
						<div
							id="form"
							onSubmit={(e) => {
								e.stopPropagation();
							}}
						>
							<div className="form-element">
								<label htmlFor="nome">Nome:</label>
								<div className="input-container">
									<Field
										type="text"
										name="nome"
										id="nome"
										className={touched.nome && errors.nome ? "input-error" : ""}
									/>
									<ErrorMessage
										name="nome"
										component="div"
										className="error-message"
									/>
								</div>
							</div>
							<div className="form-element">
								<label htmlFor="valor">Valor:</label>
								<div className="input-container">
									<Field
										type="number"
										name="valor"
										id="valor"
										className={
											touched.valor && errors.valor ? "input-error" : ""
										}
									/>
									<ErrorMessage
										name="valor"
										component="div"
										className="error-message"
									/>
								</div>
							</div>
							<div className="form-element">
								<label htmlFor="quantidade">Quantidade:</label>
								<div className="input-container">
									<Field
										type="number"
										name="quantidade"
										id="quantidade"
										className={
											touched.quantidade && errors.quantidade
												? "input-error"
												: ""
										}
									/>
									<ErrorMessage
										name="quantidade"
										component="div"
										className="error-message"
									/>
								</div>
							</div>
							<button id="adicionar" type="button" onClick={() => submitForm()}>
								Adicionar
							</button>
						</div>
					)}
				</Formik>

				<div className="compras-list-container">
					<h4>Compras Adicionadas:</h4>
					{compras.length === 0 ? (
						<p className="no-compras-message">Nenhuma compra adicionada.</p>
					) : (
						<ul className="compras-list">
							{compras.map((compra) => (
								<li key={compra.id} className="compra-item">
									<span>
										R$ {compra.valor} | {compra.quantidade}x | {compra.nome}
									</span>
									<img
										src={CloseIcon}
										alt="Fechar"
										className="remove-button"
										onClick={() => handleRemoveCompra(compra.id)}
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default ComprasModal;
