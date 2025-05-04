import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { extractUrl } from "../../../service/furia-api";
import { FormValues } from "../form-section";

const Thanks: React.FC = () => {
	const { values } = useFormikContext<FormValues>();

	useEffect(() => {
		values.esportsLinks.forEach(async ({ url }) => {
			try {
				await extractUrl(url, values.cpf);
				console.log(`Extract enviado para ${url}`);
			} catch (err) {
				console.error(err);
			}
		});
	}, []);

	return <h3>Obrigado pela colaboração!</h3>;
};

export default Thanks;
