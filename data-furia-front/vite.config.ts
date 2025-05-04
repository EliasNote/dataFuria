import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	base: "/data-furia-front/",
	plugins: [react()],
	build: {
		outDir: "docs",
	},
});
