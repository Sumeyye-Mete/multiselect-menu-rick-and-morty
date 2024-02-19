import React from "react";

type PropType = {
	text: string;
	filter: string;
};

const MarkItem = ({ text, filter }: PropType) => {
	/* This component makes the filtered area of texts bold.*/
	/*I chose not to use 'dangerouslySetInnerHTML' in the 'p' tag due to security concerns, 
	  even though it could accomplish the task easily.*/

	const unmarked: JSX.Element = <p>{text}</p>;

	if (!filter) return unmarked;

	let searchVal: RegExp = new RegExp(filter, "gi");

	if (!searchVal.test(text)) {
		return unmarked;
	}

	const parts: string[] = text
		.toLocaleLowerCase()
		.trim()
		.replace(/\s+/g, " ")
		.split(searchVal);

	return (
		<p>
			{parts.map((part, index) => {
				if (index === parts.length - 1) {
					return <span key={index}>{part}</span>;
				}
				return (
					<span key={index}>
						{part}
						<strong>{filter}</strong>
					</span>
				);
			})}
		</p>
	);
};

export default MarkItem;
