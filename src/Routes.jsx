import React, { Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Footer, ScrollToTop } from "./components";
import routesConfig, { authorizedRoutes } from "./routesConfig";
import PageLoader from "./components/pageLoader/PageLoader";
import Cover from "./components/cover/cover";
import { AuthenticationConext } from "config/FirestoreContext";

const ContentWrapper = ({ Component }) => {
	return (
		<>
			<Component />
			{/* <Footer /> */}
		</>
	);
};
function CustomRoutes() {
	const signinToken =
		localStorage.getItem("tokenResponse") &&
		JSON.parse(localStorage.getItem("tokenResponse"));
	const isLoggedIn = signinToken?.idToken ? signinToken?.idToken : false;
	const { currentUser = {} } = useContext(AuthenticationConext);

	const allRoutes = isLoggedIn
		? [...routesConfig, ...authorizedRoutes]
		: routesConfig;

	return (
		<ScrollToTop>
			<Suspense
				fallback={
					<>
						<Cover />
						<PageLoader />
					</>
				}
			>
				<Routes>
					{allRoutes.map(({ path, element: Component }, index) => (
						<Route
							path={path}
							element={<ContentWrapper Component={Component} />}
							key={index}
						/>
					))}
				</Routes>
			</Suspense>
		</ScrollToTop>
	);
}

export default CustomRoutes;
