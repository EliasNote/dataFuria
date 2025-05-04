export interface CreateUserPayload {
	nome: string;
	endereco: string;
	cpf: string;
	email: string;
	interesses?: string;
	atividades?: string;
	eventos?: string;
	produtos?: Array<{ nome: string; valor: string; quantidade: string }>;
}

interface CreateUserResponse {
	id: number;
}

export const apiUrl = `${import.meta.env.BASE_URL}:${import.meta.env.PORT}`;

export async function createUser(payload: CreateUserPayload): Promise<number> {
	const res = await fetch(`${apiUrl}/users`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (!res.ok) {
		throw new Error(`Erro ${res.status}: ${res.statusText}`);
	}
	const data = (await res.json()) as CreateUserResponse;
	return data.id;
}

export async function uploadDocument(file: File, cpf: string): Promise<void> {
	const fd = new FormData();
	fd.append("file", file);

	const res = await fetch(
		`${apiUrl}/file/upload?cpf=${encodeURIComponent(cpf)}`,
		{
			method: "POST",
			headers: { cpf },
			body: fd,
		}
	);

	if (!res.ok) {
		throw new Error(`Upload falhou: ${res.status} ${res.statusText}`);
	}
}

export async function extractUrl(url: string, cpf: string): Promise<void> {
	const endpoint = `${apiUrl}/users/extract?url=${encodeURIComponent(
		url
	)}&cpf=${encodeURIComponent(cpf)}`;
	const res = await fetch(endpoint, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) {
		throw new Error(`Extract falhou (${url}): ${res.status} ${res.statusText}`);
	}
}
