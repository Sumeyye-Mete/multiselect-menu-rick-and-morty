import MultiSelect from "./components/MultiSelect";
import { handleKeyDown } from "./helpers/functions";
import "./index.scss";

const App = (): JSX.Element => {
	return (
		<div
			onKeyDown={(e) => handleKeyDown(e)}
			className="main-section d-flex flex-column gap-3 "
		>
			<MultiSelect />
		</div>
	);
};

export default App;
