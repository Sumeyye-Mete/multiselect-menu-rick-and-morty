import axios from "axios";
import { CharactersResponse } from "../helpers/types";

export const BASE_URL = "https://rickandmortyapi.com/api";

export const filterCharactersByName = async (
	name: string
): Promise<CharactersResponse> => {
	const resp = await axios.get(`${BASE_URL}/character/?name=${name}`);
	const data = resp.data;
	return data;
};

export const getNextPageContent = async (
	nextPageUrl: string
): Promise<CharactersResponse> => {
	const resp = await axios.get(nextPageUrl);
	const data = resp.data;
	return data;
};
