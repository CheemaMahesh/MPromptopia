"use client";

import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
import { useRouter ,useSearchParams} from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
//   const { data: session } = useSession();
  const searchParams=useSearchParams();
  const promptId=searchParams.get('id')

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });


  useEffect(()=>{
        const getPromptDetails=async ()=>{
            const response=await fetch(`/api/prompt/${promptId}`);
            const data=await response.json();
            setPost({
                prompt:data.prompt,
                tag:data.tag
            })

        }
        if(promptId) getPromptDetails();
  },[promptId])

  const updataPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if(!promptId)alert("Missing Prompt ID");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("error in response create-prompt page",error);
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updataPrompt}
    />
  );
};

export default EditPrompt;
