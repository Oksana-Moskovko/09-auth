"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

const EditProfile = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.userName ?? "");
    });
  }, []);

  const handleClick = () => {
    router.push("/profile");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({ userName });
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="avatar"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={handleChange}
              className={css.input}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={handleClick}
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
