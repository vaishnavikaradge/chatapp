import "./addUser.css";
import { db } from "../../../../lib/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const { currentUser, isLoading, fetchUserInfo } = useUserStore(); // Ensure currentUser is fetched correctly from the store

  // Fetch current user information on component mount
  useEffect(() => {
    const uid = "current_user_uid"; // Replace with actual UID of the current user
    fetchUserInfo(uid);
  }, [fetchUserInfo]);

  // Add useEffect to log currentUser when it's available
  useEffect(() => {
    if (currentUser) {
      console.log("currentUser:", currentUser);
    } else {
      console.log("currentUser is undefined");
    }
  }, [currentUser]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        const userData = querySnapShot.docs[0].data();
        setUser({
          ...userData,
          id: querySnapShot.docs[0].id, // Ensure user ID is captured
        });
        console.log("User found:", userData);
      } else {
        console.log("User not found");
      }
    } catch (err) {
      console.log("Error searching user:", err);
    }
  };

  const handleAdd = async () => {
    if (!user || !currentUser) {
      console.log("User or CurrentUser is undefined");
      return;
    }

    try {
      const newChatRef = doc(collection(db, "chats"));

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      console.log('newChatRef.id:', newChatRef.id);
      console.log('user.id:', user.id);
      console.log('currentUser.id:', currentUser.id);

      await updateDoc(doc(db, "userchats", user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: serverTimestamp(),
        }),
      });

      await updateDoc(doc(db, "userchats", currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: serverTimestamp(),
        }),
      });

      console.log("User successfully added to chat");
    } catch (err) {
      console.log("Error adding user to chat:", err);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" required />
        <button type="submit">Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="User Avatar" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;