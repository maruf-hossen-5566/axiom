import Header from "@/components/custom/Header/Header.jsx";
import InputAndFilter from "@/components/custom/Search/InputAndFilter";
import { Outlet } from "react-router-dom";

const SearchLayout = () => {
	return (
		<>
			<Header />
			<div className="w-full px-6 md:px-12 flex flex-col items-start justify-start">
				<div className="max-w-screen-md w-full my-16 mx-auto flex flex-col items-start justify-center gap-6 ">
					<InputAndFilter />

					<Outlet />
				</div>
			</div>
		</>
	);
};

export default SearchLayout;
