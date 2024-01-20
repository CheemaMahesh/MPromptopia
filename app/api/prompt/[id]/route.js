import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

//GET (READ)
export const GET=async (request, {params})=>{
    try {
        await connectToDB();

        const prompt=await Prompt.findById(params.id).populate('creator');

            if(!prompt){
                return new Reaponse ("Prompt not found", {status:404})
            }
        return new Response(JSON.stringify(prompt),{status:201});
    } catch (error) {
        return new Response("Failed to fetch prompt [id",{status:500});
    }
}

//PATCH (UPDATE)

export const PATCH=async (request, {params})=>{
    const {prompt,tag}=await request.json();
    try{
        const existingPrompt=await Prompt.findById(params.id);
        if(!existingPrompt){
            return new Response("prompt not found", {status:404});
        }
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status:201});
    }catch(err){
        return new Response("Failed to patch prompt [id",{status:500});
    }
}

//DELETE
export const DELETE=async (request,{params})=>{
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully")
    } catch (error) {
        return new Response("Failed to delete prompt [id",{status:500});
    }
}