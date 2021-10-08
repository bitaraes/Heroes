const BASE_URL = "http://homologacao3.azapfy.com.br/api/ps/metahumans";

export async function findHeroes() {
	const req = await fetch(BASE_URL, { method: "GET" })
		.then((res) => res.json())
		.then((data) => Array.from(data));
	return req;
}
