import React from "react";
import { useFormikContext } from "formik";
import { uploadDocument } from "../../../service/furia-api";
import { FormValues } from "../form-section";

const UserValidation: React.FC = () => {
	const { touched, errors, setFieldValue, values } =
		useFormikContext<FormValues>();

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.currentTarget.files?.[0] || null;
		setFieldValue("documento", file);
		if (file && values.cpf) {
			try {
				await uploadDocument(file, values.cpf);
				console.log("Documento enviado para validação");
			} catch (err) {
				console.error("Erro ao validar documento:", err);
			}
		}
	};

	return (
		<>
			<div className="form-element">
				<label></label>
				<div className="file-upload">
					<label htmlFor="documento">
						Validação de identidade por IA
						<br />
						Documento RG ou CPF (PDF ou imagem)
					</label>
					<div className="input-container">
						<input
							id="documento"
							name="documento"
							type="file"
							accept=".pdf,image/*"
							hidden
							onChange={handleFileChange}
						/>
						<label htmlFor="documento" className="file-input-label">
							Selecione um documento
						</label>
						{touched.documento && errors.documento && (
							<div className="error-message file-error">{errors.documento}</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserValidation;
