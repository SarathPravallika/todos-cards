import React, { useEffect, useState } from "react";
import CardsList from "./components/CardsList";
import "./App.css";
import db from "./lib/firebase-config";
import {
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  addDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [activeContent, setActiveContent] = useState("");

  useEffect(() => {
    const taskColRef = query(
      collection(db, "tasks"),
      orderBy("created", "asc")
    );
    onSnapshot(taskColRef, (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          content: doc.data().content,
        }))
      );
    });
  }, []);

  const saveDocument = async () => {
    const taskDocRef = doc(db, "tasks", activeId);
    try {
      await updateDoc(taskDocRef, {
        content: activeContent,
      });
      setActiveId("");
      setActiveContent("");
    } catch (err) {
      alert(err);
    }
  };

  const handleOutsideClick = async (e, id) => {
    e.stopPropagation();
    if (activeId && id !== activeId) {
      await saveDocument();
    }
  };

  const handleSubmit = async (e) => {
    handleOutsideClick(e);
    try {
      const result = await addDoc(collection(db, "tasks"), {
        content: "",
        created: Timestamp.now(),
      });
      setActiveId(result.id);
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async (e, id) => {
    await handleOutsideClick(e);
    const taskDocRef = doc(db, "tasks", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
  };

  const handleActivateCard = async (e, id) => {
    await handleOutsideClick(e, id);
    setActiveId(id);
    setActiveContent(todos.find((todo) => todo.id === id).content);
  };

  return (
    <div
      className="App"
      onClick={(e) => {
        handleOutsideClick(e);
      }}
    >
      <CardsList
        cards={todos}
        activeId={activeId}
        setActiveId={setActiveId}
        activeContent={activeContent}
        setActiveContent={setActiveContent}
        handleActivateCard={handleActivateCard}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
