'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

function UserPage() {
  const [prompts, setPrompts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/${id}/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setPrompts(data);
        console.log("Hai MAHESHHHHHHHHHHHHHHHHHHHHHHHHHHHHh", data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div>
      <h1>User ID: {id}</h1>
     
      <ul>
        {prompts.map((prompt) => (
          <li key={prompt._id}>
            <strong>Prompt:</strong> {prompt.prompt} <br />
            <strong>Tags:</strong> {prompt.tag}
            <Image
      src={prompt.creator.image}
      width={30}
      height={30}
    alt="img"
      />
          </li>
        ))}
      </ul>
      {prompts.length === 0 && <p>No prompts found for this user.</p>}
    </div>
  );
}

export default UserPage;
