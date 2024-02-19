/* This function makes arrow keys usable for navigation  */

export const handleKeyDown = (event: React.KeyboardEvent) => {
	const focusedElement = document.activeElement as HTMLElement;

	const tabbableElements =
		document.querySelectorAll<HTMLElement>("button, input");

	const currentIndex: number =
		Array.from(tabbableElements).indexOf(focusedElement);

	switch (event.key) {
		case "ArrowRight":
		case "ArrowDown": {
			event.preventDefault();
			const nextIndex: number = (currentIndex + 1) % tabbableElements.length;
			const nextElement: HTMLButtonElement | HTMLInputElement =
				tabbableElements[nextIndex] as HTMLButtonElement | HTMLInputElement;
			nextElement.focus();
			break;
		}
		case "ArrowLeft":
		case "ArrowUp": {
			event.preventDefault();
			if (currentIndex === 0) return;
			const prevIndex: number = (currentIndex - 1) % tabbableElements.length;
			const prevElement: HTMLButtonElement | HTMLInputElement =
				tabbableElements[prevIndex] as HTMLButtonElement | HTMLInputElement;
			prevElement?.focus();
			break;
		}
	}
};
