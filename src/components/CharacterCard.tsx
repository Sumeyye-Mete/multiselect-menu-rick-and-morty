import { Dispatch, SetStateAction } from "react";
import { CharacterObj } from "../helpers/types";
import MarkItem from "./MarkItem";

type PropType = {
	item: CharacterObj;
	filter: string;
	setSelectedItems: Dispatch<SetStateAction<CharacterObj[]>>;
	selectedItems: CharacterObj[];

};

const CharacterCard = ({
	item,
	filter,
	setSelectedItems,
	selectedItems,
}: PropType) => {

	const handleKeyboardAction = (e: React.KeyboardEvent<HTMLInputElement>) : void => {
		if (e.key === "Enter") {
			e.preventDefault();
			if (selectedItems.some((el) => el.id === item.id)) {
				setSelectedItems((prev) => prev.filter((el) => el.id !== item.id));
			} else {
				setSelectedItems((prev) => [item, ...prev]);
			}
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.checked) {
			setSelectedItems((prev) => [item, ...prev]);
		} else {
			setSelectedItems((prev) => prev.filter((el) => el.id !== item.id));
		}
	};

	return (
		<div className="character-card">
			<input
				type="checkbox"
				id={`${item.id}`}
				className="styled-checkbox"
				onChange={(e) => handleChange(e)}
				onKeyDown={(e) => handleKeyboardAction(e)}
				checked={selectedItems.some((el) => el.id === item.id)}
			/>
			<label htmlFor={`${item.id}`}>
				<img src={item.image} alt={item.name} />
				<div>
					<MarkItem text={item.name} filter={filter} />
					<p>{item.episode.length} Episodes</p>
				</div>
			</label>
		</div>
	);
};

export default CharacterCard;
