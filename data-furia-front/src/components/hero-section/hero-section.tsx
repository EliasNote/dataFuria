import "./hero-section.css";
import Logo from "../../assets/logo.svg";

const HeroSection = () => {
	const scrollToForm = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		document
			.getElementById("form-section")
			?.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<div id="hero-section">
			<img src={Logo} />
			<h1>Ajude a FURIA a te conhecer melhor!</h1>
			<p>
				Faça parte de algo maior e transforme sua paixão pela FURIA em uma
				conexão inesquecível. Sua torcida merece ser recompensada.
				<br />
				Dê o primeiro passo e sinta o esports como nunca antes!
			</p>
			<button id="comecar" onClick={scrollToForm}>
				Começar agora
			</button>
		</div>
	);
};

export default HeroSection;
