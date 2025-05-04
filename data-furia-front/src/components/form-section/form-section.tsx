import { Field, Form, Formik, ErrorMessage, FieldArray } from "formik";
import { useState } from "react";
import "./form-section.css";
import * as Yup from "yup";
import ComprasModal, { Compra } from "./ComprasModal";
import CloseIcon from "../../assets/close-button.svg";

const validationSchema = Yup.object().shape({
	nome: Yup.string().required("Campo obrigatório"),
	email: Yup.string()
		.email("Digite um email válido")
		.required("Campo obrigatório"),
	endereco: Yup.string().required("Campo obrigatório"),
	cpf: Yup.string().required("Campo obrigatório"),
	documento: Yup.mixed<File>()
		.required("Documento é obrigatório")
		.test(
			"fileFormat",
			"Formato inválido, envie PDF ou imagem",
			(value) =>
				value &&
				["application/pdf", "image/jpeg", "image/png"].includes(value.type)
		),
	interesses: Yup.string(),
	atividades: Yup.string(),
	eventos: Yup.string(),
	compras: Yup.string(),
	esportsLinks: Yup.array().of(
		Yup.object().shape({
			url: Yup.string().url("URL inválida"),
		})
	),
});

const FormSection = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleSaveCompras = (
		compras: Compra[],
		setFieldValue: (field: string, value: string) => void
	) => {
		setFieldValue("compras", JSON.stringify(compras));
		setIsModalOpen(false);
	};

	return (
		<div id="form-section">
			<h2>Formulário</h2>
			<Formik
				initialValues={{
					nome: "",
					email: "",
					endereco: "",
					cpf: "",
					documento: null,
					interesses: "",
					atividades: "",
					eventos: "",
					compras: "",
					esportsLinks: [{ url: "" }],
				}}
				onSubmit={(values) => {
					const finalValues = {
						...values,
						esportsLinks: values.esportsLinks.filter((link) => link.url),
						compras: values.compras ? JSON.parse(values.compras) : [],
					};
					console.log(finalValues);
				}}
				validationSchema={validationSchema}
			>
				{({ handleSubmit, errors, touched, setFieldValue, values }) => (
					<Form onSubmit={handleSubmit} id="form">
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
									className={
										touched.endereco && errors.endereco ? "input-error" : ""
									}
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
								<ErrorMessage
									name="cpf"
									component="div"
									className="error-message"
								/>
							</div>
						</div>
						<div className="form-element">
							<label></label>
							<div className="input-container">
								<label htmlFor="documento">
									Validação de identidade por IA
									<br />
									Documento RG ou CPF (PDF ou imagem):
								</label>
								<input
									id="documento"
									name="documento"
									type="file"
									accept=".pdf,image/*"
									hidden
									onChange={(e) =>
										setFieldValue(
											"documento",
											e.currentTarget.files?.[0] || null
										)
									}
								/>
								<label htmlFor="documento" className="file-input-label">
									Selecione um documento
								</label>
								{touched.documento && errors.documento && (
									<div className="error-message file-error">
										{errors.documento}
									</div>
								)}
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
							<label htmlFor="redes-sociais">Vincular redes sociais</label>
							<div id="redes-sociais-container">
								<button type="button" className="redes-sociais" id="google">
									Google
								</button>

								<button type="button" className="redes-sociais" id="facebook">
									Facebook
								</button>
							</div>
						</div>
						<div className="form-element">
							<label htmlFor="compras">
								Compras realizadas <br />
								no último ano:
							</label>
							<button
								type="button"
								className="register-button"
								onClick={handleOpenModal}
							>
								Compras
							</button>
						</div>

						<div className="form-element">
							<label>Perfis de e‑sports:</label>
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

						<button type="submit" id="enviar">
							Enviar
						</button>

						<ComprasModal
							isOpen={isModalOpen}
							onClose={handleCloseModal}
							onSave={(compras) => handleSaveCompras(compras, setFieldValue)}
						/>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FormSection;
