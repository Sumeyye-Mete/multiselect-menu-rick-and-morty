import { useEffect, useRef, useState } from "react";
import {
	filterCharactersByName,
	getNextPageContent,
} from "../api/rickAndMortyService";
import { isAxiosError } from "axios";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import CharacterCard from "./CharacterCard";
import { Spinner } from "react-bootstrap";
import { CharacterObj, CharactersResponse } from "../helpers/types";

const MultiSelect = () => {
	const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
	const [characters, setCharacters] = useState<CharacterObj[]>([]);
	const [filter, setFilter] = useState<string>("");
	const [selectedItems, setSelectedItems] = useState<CharacterObj[]>([]);

	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const mainInputRef = useRef<HTMLInputElement>(null);

	/* Load data according to filter */
	const filterData = async (): Promise<void> => {
		setLoading(true);
		try {
			const resp: CharactersResponse = await filterCharactersByName(filter);
			setCharacters(resp.results);
			setNextPageUrl(resp.info.next);
			setError("");
		} catch (error) {
			if (isAxiosError(error)) {
				setError(error?.response?.data?.error);
			} else {
				setError("Something went wrong!");
			}
			setCharacters([]);
			setNextPageUrl(null);
		} finally {
			setLoading(false);
		}
	};

	/* Loading Data with scrolling , infinite scroll effect*/
	const loadNextPageData = async (url: string): Promise<void> => {
		setLoading(true);
		try {
			const resp: CharactersResponse = await getNextPageContent(url);
			setCharacters((prev) => [...prev, ...resp.results]);
			setNextPageUrl(resp.info.next);
		} catch (error) {
			if (isAxiosError(error)) {
				setError(error?.response?.data?.error);
			} else {
				setError("Something went wrong!");
			}
		} finally {
			setLoading(false);
		}
	};

	/* Load next page when scrolled to bottom, if next page url is none it doesn't execute*/
	const handleScroll = (e: any): void => {
		const bottom =
			e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
		if (bottom && typeof nextPageUrl === "string") {
			loadNextPageData(nextPageUrl);
		}
	};

	/* arrow button open/closes menu */
	const handleToggleMenu = (): void => {
		if (openMenu) {
			setOpenMenu(false);
		} else {
			setOpenMenu(true);
		}
	};

	/* input change */
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (!openMenu) setOpenMenu(true);
		setFilter(e.target.value);
	};

	/* delete button action */
	const handleDeleteBtn = (id: number): void => {
		mainInputRef?.current?.focus();
		setSelectedItems((prev) => prev.filter((el) => el.id !== id));
	};

	useEffect(() => {
		filterData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter]);

	useEffect(() => {}, []);

	return (
		<>
			<div className="multiselect-menu-upper-section">
				<div className="selected-items">
					{selectedItems.map((item, index) => {
						return (
							<div key={index} className="selected-item">
								<span>{item.name} </span>
								<button
									onClick={() => handleDeleteBtn(item.id)}
									className="deleteItem"
								>
									X
								</button>
							</div>
						);
					})}
				</div>
				<input
					ref={mainInputRef}
					type="text"
					className="input-text"
					value={filter}
					onChange={(e) => handleInput(e)}
				/>
				<button className="open-menu" onClick={handleToggleMenu}>
					{openMenu ? (
						<FaCaretUp className="arrow" />
					) : (
						<FaCaretDown className="arrow" />
					)}
				</button>
			</div>
			<div
				className={` multiselect-menu-lower-section 
				${!openMenu ? "invisible" : ""} `}
			>
				<div className="inner-section" onScroll={(e) => handleScroll(e)}>
					{error && <p className="error-text">{error}</p>}
					{loading && (
						<div className="spinner">
							<Spinner />
						</div>
					)}
					{characters?.map((item: CharacterObj, index: number) => {
						return (
							<CharacterCard
								item={item}
								key={item.id}
								filter={filter}
								setSelectedItems={setSelectedItems}
								selectedItems={selectedItems}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default MultiSelect;
