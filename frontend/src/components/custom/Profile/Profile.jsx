import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProfile } from "@/api/profileApi.js";
import { useProfileStore } from "@/store/profileStore.js";

const Profile = () => {
	const { username } = useParams();
	const profile = useProfileStore((state) => state?.profile);
	const followerCount = useProfileStore((state) => state?.followerCount);
	const followingCount = useProfileStore((state) => state?.followingCount);
	const isFollowing = useProfileStore((state) => state?.isFollowing);
	const posts = useProfileStore((state) => state?.posts);
	const setProfile = useProfileStore((state) => state?.setProfile);
	const setPosts = useProfileStore((state) => state?.setPosts);
	const setFollowerCount = useProfileStore(
		(state) => state?.setFollowerCount
	);
	const setFollowingCount = useProfileStore(
		(state) => state?.setFollowingCount
	);
	const setIsFollowing = useProfileStore((state) => state?.setIsFollowing);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await getProfile({ username: username });
				setProfile(res?.data?.profile);
				setPosts(res?.data?.posts);
			} catch (error) {
				console.error("Profile fetch error: ", error);
			}
		};
		fetchProfile();
	}, []);

	return (
		<>
			<div className=""></div>
		</>
	);
};

export default Profile;
