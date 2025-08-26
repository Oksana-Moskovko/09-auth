import Link from "next/link";
import css from "./ProfilePage.module.css";
// import { getServerMe } from "@/lib/api/serverApi";
import Image from "next/image";
import { getServerMe } from "@/lib/api/serverApi";

//Додайте на сторінку профілю усі небхідні meta-теги.

const Profile = async () => {
  const user = await getServerMe();
  // console.log("user", user);

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.userName}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
};
export default Profile;
