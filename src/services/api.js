const BASE_URL = "http://homologacao3.azapfy.com.br/api/ps/metahumans";

export async function findHeroes() {
	const req = await fetch(BASE_URL);
	const json = await req.json();
	return json;
}
