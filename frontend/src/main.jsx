import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
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
import Profile from "@/components/custom/Profile/Profile";
import PublicOnlyRoute from "@/components/routes/PublicOnlyRoute.jsx";
import DashboardLayout from "@/Layout/DashboardLayout.jsx";
import Posts from "@/components/custom/Dashboard/Posts/Posts.jsx";
import Bookmarks from "@/components/custom/Dashboard/Bookmarks/Bookmarks.jsx";
import Followers from "@/components/custom/Dashboard/Followers/Followers.jsx";
import Following from "@/components/custom/Dashboard/Following/Following.jsx";
import Blocked from "@/components/custom/Dashboard/Blocked/Blocked.jsx";
import AnalyticsComp from "@/components/custom/Dashboard/AnalyticsComp/AnalyticsComp.jsx";
import PostsPage from "@/components/custom/Search/PostsPage.jsx";
import UsersPage from "@/components/custom/Search/UsersPage.jsx";
import TagsPage from "@/components/custom/Search/TagsPage.jsx";
import Tags from "@/components/custom/Tag/Tags.jsx";
import Tag from "@/components/custom/Tag/Tag.jsx";
import SearchLayout from "./Layout/SearchLayout";
import AccountLayout from "./Layout/AccountLayout";
import {Profile as ProfilePage} from "./components/custom/Account/Profile";
import Notification from "@/components/custom/Account/Notification.jsx";
import Security from "@/components/custom/Account/Security.jsx";
import NotificationPage from "@/components/custom/Notification/NotificationPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<BaseLayout/>}
        >
            <Route
                path=""
                element={<Layout/>}
            >
                <Route
                    index
                    element={<Home/>}
                />
                <Route
                    path=":username"
                    element={<Profile/>}
                />
                <Route
                    path=":author/:slug"
                    element={<PostDetail/>}
                />
                <Route
                    path="tag"
                    element={<Tags/>}
                />
                <Route
                    path="tag/:slug"
                    element={<Tag/>}
                />
                <Route
                    path="login"
                    element={
                        <PublicOnlyRoute>
                            <Login/>
                        </PublicOnlyRoute>
                    }
                />
                <Route
                    path="signup"
                    element={
                        <PublicOnlyRoute>
                            <Signup/>
                        </PublicOnlyRoute>
                    }
                />
            </Route>
            <Route
                path=""
                element={<EditorLayout/>}
            >
                <Route
                    path="new"
                    element={<NewPost/>}
                />
            </Route>
            <Route
                path="dashboard"
                element={<DashboardLayout/>}
            >
                <Route
                    path=""
                    element={<Posts/>}
                />
                <Route
                    path="bookmarks"
                    element={<Bookmarks/>}
                />
                <Route
                    path="followers"
                    element={<Followers/>}
                />
                <Route
                    path="following"
                    element={<Following/>}
                />
                <Route
                    path="analytics"
                    element={<AnalyticsComp/>}
                />
                <Route
                    path="blocked"
                    element={<Blocked/>}
                />
            </Route>
            <Route
                path="search"
                element={<SearchLayout/>}
            >
                <Route
                    index
                    element={<PostsPage/>}
                />
                <Route
                    path="posts"
                    element={<PostsPage/>}
                />
                <Route
                    path="users"
                    element={<UsersPage/>}
                />
                <Route
                    path="tags"
                    element={<TagsPage/>}
                />
            </Route>
            <Route
                path="account"
                element={<AccountLayout/>}
            >
                <Route
                    index
                    element={<Navigate to={"profile"}/>}
                />
                <Route
                    path="profile"
                    element={<ProfilePage/>}
                />
                <Route
                    path="notification"
                    element={<Notification/>}
                />
                <Route
                    path="security"
                    element={<Security/>}
                />
                <Route
                    path="danger"
                    element={<Security/>}
                />
            </Route>
            <Route
                path="notification"
                element={<Layout/>}
            >
                <Route
                    path=""
                    element={<NotificationPage/>}
                />
            </Route>
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);
