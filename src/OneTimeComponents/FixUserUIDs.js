import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const PatchUserUIDs = () => {
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    const patchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const total = querySnapshot.size;
        let updated = 0;

        for (const userDoc of querySnapshot.docs) {
          const data = userDoc.data();
          if (!data.uid) {
            await updateDoc(doc(db, "users", userDoc.id), {
              uid: userDoc.id,
            });
            updated++;
            console.log(`✅ Patched UID for: ${userDoc.id}`);
          }
        }

        setStatus(`Done! Patched ${updated} of ${total} users.`);
      } catch (error) {
        console.error("❌ Error patching users:", error);
        setStatus("Error occurred! See console.");
      }
    };

    patchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h3>User UID Patcher</h3>
      <p>{status}</p>
    </div>
  );
};

export default PatchUserUIDs;
