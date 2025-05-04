import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import "./form-section.css";
import * as Yup from "yup";
import StepUser from "./steps/StepUser";
import StepSocialDocsESports from "./steps/StepSocialDocsESports";

export interface FormValues {
	nome: string;
	email: string;
	endereco: string;
	cpf: string;
	documento: File | null;
	redesSociais: { google: boolean; facebook: boolean };
	esportsLinks: { url: string }[];
}

const validationSchemas = [
	Yup.object({
		nome: Yup.string().required("Campo obrigatório"),
		email: Yup.string().email("Email inválido").required("Campo obrigatório"),
		endereco: Yup.string().required("Campo obrigatório"),
		cpf: Yup.string().required("Campo obrigatório"),
	}),
	Yup.object({
		documento: Yup.mixed<File>()
			.required("Documento é obrigatório")
			.test(
				"fileFormat",
				"Formato inválido",
				(value) =>
					!!value &&
					["application/pdf", "image/jpeg", "image/png"].includes(value.type)
			),
		redesSociais: Yup.object({
			google: Yup.boolean(),
			facebook: Yup.boolean(),
		}),
		esportsLinks: Yup.array()
			.of(Yup.object({ url: Yup.string().url("URL inválida").required() }))
			.min(1, "Informe pelo menos um link"),
	}),
];

const initialValues: FormValues = {
	nome: "",
	email: "",
	endereco: "",
	cpf: "",
	documento: null,
	redesSociais: { google: false, facebook: false },
	esportsLinks: [{ url: "" }],
};

const MultiStepForm: React.FC = () => {
	const [step, setStep] = useState(0);
	const isLast = step === validationSchemas.length - 1;

	const next = () => setStep((s) => s + 1);
	const back = () => setStep((s) => s - 1);

	return (
		<div id="form-section">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchemas[step]}
				onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>) => {
					if (!isLast) {
						next();
						actions.setTouched({});
						actions.setSubmitting(false);
					} else {
						console.log("Enviando ao servidor:", values);
					}
				}}
			>
				{({ handleSubmit }) => (
					<Form
						onSubmit={handleSubmit}
						id="form"
						className={step === 0 ? "no-margin" : ""}
					>
						{step === 0 && <StepUser />}
						{step === 1 && <StepSocialDocsESports />}
						<div className="wizard-buttons">
							{step > 0 && (
								<button
									type="button"
									className="passos"
									id="anterior"
									onClick={back}
								>
									Anterior
								</button>
							)}
							<button
								type="submit"
								className="passos"
								id={isLast ? "enviar" : "proximo"}
							>
								{isLast ? "Enviar" : "Próximo"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default MultiStepForm;
