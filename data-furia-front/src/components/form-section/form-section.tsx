import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import "./form-section.css";
import * as Yup from "yup";
import StepUser from "./steps/StepUser";
import StepSocialDocsESports from "./steps/StepSocialDocsESports";
import { createUser, CreateUserPayload } from "../../service/furia-api";
import Thanks from "./steps/Thanks";
import UserValidation from "./steps/UserValidation";

const initialValues: FormValues = {
	compras: "",
	nome: "",
	email: "",
	endereco: "",
	cpf: "",
	documento: null,
	interesses: "",
	atividades: "",
	eventos: "",
	redesSociais: { google: false, facebook: false },
	esportsLinks: [{ url: "" }],
};

export interface FormValues {
	compras: string;
	nome: string;
	email: string;
	endereco: string;
	cpf: string;
	documento: File | null;
	interesses: string;
	atividades: string;
	eventos: string;
	redesSociais: { google: boolean; facebook: boolean };
	esportsLinks: { url: string }[];
}

const validationSchemas = [
	Yup.object({
		nome: Yup.string().required("Campo obrigatório"),
		email: Yup.string().email("Email inválido").required("Campo obrigatório"),
		endereco: Yup.string().required("Campo obrigatório"),
		cpf: Yup.string().required("Campo obrigatório"),
		interesses: Yup.string(),
		atividades: Yup.string(),
		eventos: Yup.string(),
		esportsLinks: Yup.array()
			.of(
				Yup.object({
					url: Yup.string().url("URL inválida"),
				})
			)
			.test("at-least-one", "Informe pelo menos um link", (links = []) =>
				links.some((l) => l.url && l.url.trim() !== "")
			),
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
	}),
	Yup.object({
		redesSociais: Yup.object({
			google: Yup.boolean(),
			facebook: Yup.boolean(),
		}),
	}),
];

const MultiStepForm: React.FC = () => {
	const [step, setStep] = useState(0);
	const [userId, setUserId] = useState<number | null>(null);

	const next = () => setStep((s) => s + 1);

	return (
		<div id="form-section">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchemas[step]}
				onSubmit={async (
					values: FormValues,
					actions: FormikHelpers<FormValues>
				) => {
					if (step === 0) {
						const payload: CreateUserPayload = {
							nome: values.nome,
							endereco: values.endereco,
							cpf: values.cpf,
							email: values.email,
							interesses: values.interesses,
							atividades: values.atividades,
							eventos: values.eventos,
							produtos: values.compras ? JSON.parse(values.compras) : [],
						};
						try {
							const id = await createUser(payload);
							setUserId(id);
							console.log("ID retornado pela API:", id);
						} catch (err) {
							console.error(err);
							return actions.setSubmitting(false);
						}
					}

					next();
					actions.setTouched({});
					actions.setSubmitting(false);
				}}
			>
				{({ handleSubmit }) => (
					<Form
						onSubmit={handleSubmit}
						id="form"
						className={step === 0 ? "no-margin" : ""}
					>
						{step === 0 && <StepUser />}
						{step === 1 && <UserValidation />}
						{step === 2 && userId !== null && (
							<StepSocialDocsESports userId={userId} />
						)}
						{step === 3 && <Thanks />}
						{step < 3 && (
							<button type="submit" className="passos" id="proximo">
								Próximo
							</button>
						)}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default MultiStepForm;
