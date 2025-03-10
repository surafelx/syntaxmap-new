"use client";
import { useState, useEffect } from "react";

type Meaning = {
  partOfSpeech: string;
  definitions: { definition: string }[];
};

export default function DictionaryTooltip() {
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [definition, setDefinition] = useState<Meaning[] | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleDoubleClick = async (event: MouseEvent) => {
      const selectedText = window.getSelection()?.toString().trim();
      if (selectedText) {
        setSelectedWord(selectedText);
        setPosition({ x: event.pageX, y: event.pageY });
        fetchDefinition(selectedText);
        setVisible(true);
      }
      fetch("https://syntaxmap-back-p4ve.onrender.com/dictionnary", {
        method: "POST",
        body: JSON.stringify({
          word: selectedText,
          session_name: localStorage.getItem("session"),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: localStorage.getItem("jstoken") || "",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleClick = () => {
      setVisible(false);
    };

    document.addEventListener("dblclick", handleDoubleClick);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("dblclick", handleDoubleClick);
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const fetchDefinition = async (word: string) => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();
      if (data[0] && data[0].meanings) {
        setDefinition(data[0].meanings);
      } else {
        setDefinition([
          {
            partOfSpeech: "N/A",
            definitions: [{ definition: "No definition found." }],
          },
        ]);
      }
    } catch (error) {
      setDefinition([
        {
          partOfSpeech: "Error",
          definitions: [{ definition: "Could not fetch definition." }],
        },
      ]);
    }
  };

  return (
    <>
      {visible && (
        <div
          className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          style={{
            zIndex: 1000,
            position: "absolute",
            top: position.y + 10,
            left: position.x + 10,
            padding: "8px",
            border: "1px solid black",
            borderRadius: "4px",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          <strong>{selectedWord}</strong>
          {definition ? (
            definition.map((entry, index) => (
              <div key={index}>
                <p>
                  <em>{entry.partOfSpeech}</em>
                </p>
                {entry.definitions.map((def, i) => (
                  <p key={i} style={{ fontSize: "small" }}>
                    - {def.definition}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </>
  );
}
