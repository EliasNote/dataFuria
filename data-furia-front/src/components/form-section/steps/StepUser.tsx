import React, { useEffect, useState } from "react";
import { Field, ErrorMessage, useFormikContext, FieldArray } from "formik";
import ComprasModal, { Compra } from "../ComprasModal";
import { FormValues } from "../form-section";
import CloseIcon from "../../../assets/close-button.svg";

const StepUser: React.FC = () => {
	const { values, touched, errors, setFieldValue } =
		useFormikContext<FormValues>();

	const linkErrors = Array.isArray(errors.esportsLinks)
		? errors.esportsLinks
		: [];
	const linkTouched = Array.isArray(touched.esportsLinks)
		? touched.esportsLinks
		: [];

	const parsed: Compra[] =
		values.compras !== "" ? JSON.parse(values.compras) : [];

	const [modalCompras, setModalCompras] = useState<Compra[]>(parsed);

	useEffect(() => {
		setModalCompras(parsed);
	}, [values.compras]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const handleSaveCompras = (lista: Compra[]) => {
		setFieldValue("compras", JSON.stringify(lista));
		setModalCompras(lista);
		setIsModalOpen(false);
	};

	return (
		<>
			<div className="form-element">
				<label htmlFor="nome">Nome:</label>
				<div className="input-container">
					<Field
						type="text"
						name="nome"
						id="nome"
						className={touched.nome && errors.nome ? "input-error" : ""}
					/>
					<ErrorMessage name="nome" component="div" className="error-message" />
				</div>
			</div>
			<div className="form-element">
				<label htmlFor="email">Email:</label>
				<div className="input-container">
					<Field
						type="email"
						name="email"
						id="email"
						className={touched.email && errors.email ? "input-error" : ""}
					/>
					<ErrorMessage
						name="email"
						component="div"
						className="error-message"
					/>
				</div>
			</div>
			<div className="form-element">
				<label htmlFor="endereco">Endereço:</label>
				<div className="input-container">
					<Field
						type="text"
						name="endereco"
						id="endereco"
						className={touched.endereco && errors.endereco ? "input-error" : ""}
					/>
					<ErrorMessage
						name="endereco"
						component="div"
						className="error-message"
					/>
				</div>
			</div>
			<div className="form-element">
				<label htmlFor="cpf">CPF:</label>
				<div className="input-container">
					<Field
						type="text"
						name="cpf"
						id="cpf"
						className={touched.cpf && errors.cpf ? "input-error" : ""}
					/>
					<ErrorMessage name="cpf" component="div" className="error-message" />
				</div>
			</div>
			<div className="form-element">
				<label htmlFor="interesses">Interesses:</label>
				<Field as="textarea" name="interesses" id="interesses" rows={4} />
			</div>
			<div className="form-element">
				<label htmlFor="atividades">Atividades:</label>
				<Field as="textarea" name="atividades" id="atividades" rows={4} />
			</div>
			<div className="form-element">
				<label htmlFor="eventos">Eventos:</label>
				<Field as="textarea" name="eventos" id="eventos" rows={4} />
			</div>

			<div className="form-element">
				<label htmlFor="compras">
					Compras realizadas <br />
					no último ano:
				</label>
				<div className="input-container">
					<button
						type="button"
						className="register-button"
						onClick={handleOpenModal}
					>
						Compras
					</button>
				</div>
				<ComprasModal
					isOpen={isModalOpen}
					initialCompras={modalCompras}
					onClose={handleCloseModal}
					onSave={handleSaveCompras}
				/>
			</div>
			<div className="form-element">
				<label>Perfis de e-sports:</label>
				<div className="input-container">
					<FieldArray name="esportsLinks">
						{({ push, remove }) => (
							<div className="esports-links">
								{values.esportsLinks.map((_, idx) => (
									<div key={idx} className="input-pair">
										<Field
											type="url"
											name={`esportsLinks.${idx}.url`}
											placeholder="https://..."
											className={
												linkTouched[idx]?.url &&
												typeof linkErrors[idx] === "object" &&
												linkErrors[idx]?.url
													? "input-error"
													: ""
											}
										/>
										<button
											type="button"
											id="remover"
											onClick={() => remove(idx)}
										>
											<img src={CloseIcon} alt="" />
										</button>
										<ErrorMessage
											name={`esportsLinks.${idx}.url`}
											component="div"
											className="error-message"
										/>
									</div>
								))}
								<button
									type="button"
									id="novo-link"
									onClick={() => push({ url: "" })}
								>
									Novo link
								</button>
							</div>
						)}
					</FieldArray>
					{/* erro de “pelo menos um link” */}
					<ErrorMessage
						name="esportsLinks"
						component="div"
						className="error-message perfis"
					/>
				</div>
			</div>
		</>
	);
};

export default StepUser;
