import React, { useState } from "react";
import { useFormikContext, FieldArray, Field } from "formik";
import ComprasModal, { Compra } from "../ComprasModal";
import CloseIcon from "../../../assets/close-button.svg";
import { FormValues } from "../form-section";

const StepSocialDocsESports: React.FC = () => {
	const { values, touched, errors, setFieldValue } =
		useFormikContext<FormValues>();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const handleSaveCompras = (lista: Compra[]) => {
		setFieldValue("compras", JSON.stringify(lista));
		setIsModalOpen(false);
	};

	return (
		<>
			<div className="file-upload">
				<label htmlFor="documento">
					Validação de identidade por IA
					<br />
					Documento RG ou CPF (PDF ou imagem):
				</label>
				<div className="input-container">
					<input
						id="documento"
						name="documento"
						type="file"
						accept=".pdf,image/*"
						hidden
						onChange={(e) =>
							setFieldValue("documento", e.currentTarget.files?.[0] || null)
						}
					/>
					<label htmlFor="documento" className="file-input-label">
						Selecione um documento
					</label>
					{touched.documento && errors.documento && (
						<div className="error-message file-error">{errors.documento}</div>
					)}
				</div>
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
					onClose={handleCloseModal}
					onSave={handleSaveCompras}
				/>
			</div>

			<div className="form-element">
				<label htmlFor="redes-sociais">Vincular redes sociais</label>
				<div className="input-container">
					<div id="redes-sociais-container">
						<button type="button" className="redes-sociais" id="google">
							Google
						</button>

						<button type="button" className="redes-sociais" id="facebook">
							Facebook
						</button>
					</div>
				</div>
			</div>
			<div className="form-element">
				<label>Perfis de e‑sports:</label>
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
										/>
										<button
											type="button"
											id="remover"
											onClick={() => remove(idx)}
										>
											<img src={CloseIcon} alt="" />
										</button>
									</div>
								))}
								<button
									type="button"
									id="novo-link"
									onClick={() => push({ site: "", url: "" })}
								>
									Novo link
								</button>
							</div>
						)}
					</FieldArray>
				</div>
			</div>
		</>
	);
};

export default StepSocialDocsESports;
