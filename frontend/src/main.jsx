import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Layout from "@/Layout/Layout.jsx";
import Home from "@/components/custom/Home/Home.jsx";
import Login from "@/components/custom/Login/Login.jsx";
import Signup from "@/components/custom/Signup/Signup.jsx";
import NewPost from "@/components/custom/Post/New/NewPost.jsx";
import EditorLayout from "@/Layout/EditorLayout.jsx";
import BaseLayout from "@/Layout/BaseLayout.jsx";
import PostDetail from "@/components/custom/Post/Detail/PostDetail.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<BaseLayout />}>
			<Route
				path=""
				element={<Layout />}>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path=":author/:slug"
					element={<PostDetail />}
				/>
				<Route
					path="login"
					element={
						// <PublicOnlyRoute>
						<Login />
						// </PublicOnlyRoute>
					}
				/>
				<Route
					path="signup"
					element={
						// <PublicOnlyRoute>
						<Signup />
						// </PublicOnlyRoute>
					}
				/>
			</Route>
			<Route
				path=""
				element={<EditorLayout />}>
				<Route
					path="new"
					element={<NewPost />}
				/>
			</Route>
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
