import React from "react";
import { useFormikContext } from "formik";
import { FormValues } from "../form-section";
import { apiUrl } from "../../../service/furia-api";

interface Props {
	userId: number;
}

const StepSocialDocsESports: React.FC<Props> = ({ userId }) => {
	const { setFieldValue } = useFormikContext<FormValues>();

	const handleSocialClick = (provider: "google" | "facebook") => {
		const width = 600,
			height = 600;
		const left = window.screenX + (window.outerWidth - width) / 2;
		const top = window.screenY + (window.outerHeight - height) / 2;
		const authUrl = `${apiUrl}/social/${userId}/${provider}`;
		const popup = window.open(
			authUrl,
			`${provider}-login`,
			`width=${width},height=${height},left=${left},top=${top}`
		);
		const listener = (e: MessageEvent) => {
			if (e.origin !== apiUrl) return;
			if (e.data.provider === provider && e.data.socialUserId) {
				setFieldValue(`redesSociais.${provider}`, true);
				window.removeEventListener("message", listener);
				popup?.close();
			}
		};
		window.addEventListener("message", listener);
	};

	return (
		<div className="form-element">
			<label>Vincular redes sociais</label>
			<div className="input-container">
				<button
					type="button"
					id="google"
					className="redes-sociais"
					onClick={() => handleSocialClick("google")}
				>
					Google
				</button>
				<button
					type="button"
					id="facebook"
					className="redes-sociais"
					onClick={() => handleSocialClick("facebook")}
				>
					Facebook
				</button>
			</div>
		</div>
	);
};

export default StepSocialDocsESports;
