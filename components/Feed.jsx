'use client';

import { useState ,useEffect } from "react";
import PromptCard from "./PromptCard";


const PromptCardList=({data , handleTagClick})=>{
    return <div className="mt-16 prompt_layout">
            {data.map((post)=>(
                <PromptCard 
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
                />
            ))}
    </div>
}

function Feed() {
  const [searchText,setSearchText]=useState('');
  const [posts,setPosts]=useState([]);
  // const [sPrompts,setSPrompts]=useState([]);

  

 

  useEffect(()=>{
    const fetchPosts=async ()=>{
      const response=await fetch('/api/prompt');
      const data=await response.json();
      setPosts(data);
    }
    fetchPosts();
  },[]);

  const handleChange=async (e)=>{
      const sPrompt=e.target.value.toLowerCase();
      setSearchText(sPrompt);

      const sResults=posts.filter((d)=> d.prompt.toLowerCase().includes(sPrompt));
      if(sResults.length >0)setPosts(sResults);
  }


  return (
    <section className="feed">
        <form className="relative w-full flex-center">
            <input 
            type='text' 
            placeholder="search for prompts"
            value={searchText}
            onChange={handleChange}
            required
            className="search_input peer"
            />
        </form>
        <PromptCardList
        data={posts}
        handleTagClick={()=>{}}
        />
    </section>
  )
}

export default Feed
