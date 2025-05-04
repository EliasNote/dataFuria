import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";

const StepUser: React.FC = () => {
	const { touched, errors } = useFormikContext<{
		nome: string;
		email: string;
		endereco: string;
		cpf: string;
	}>();

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
		</>
	);
};

export default StepUser;
