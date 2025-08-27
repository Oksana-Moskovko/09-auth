import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

//Додайте на сторінку профілю усі небхідні meta-теги.

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();

  return {
    title: `Profile ${user.username} `,
    description: `Profile page for ${user.username} with email ${user.email}`,
    openGraph: {
      title: `${user.username} Profile`,
      description: `Profile page for ${user.username} with email ${user.email}`,
      url: "https://notehub.com/profile",
      siteName: "NoteHub",
      images: [
        {
          url: user.avatar,
          width: 400,
          height: 400,
          alt: `${user.username} Avatar`,
        },
      ],
      type: "profile",
    },
  };
}

const Profile = async () => {
  const user = await getServerMe();

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
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};
export default Profile;
