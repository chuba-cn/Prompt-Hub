import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read a single prompt based on the id params)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt){return new Response('Prompt not found', {status: 404})};

        return new Response(JSON.stringify(prompt), {staus: 200});

    } catch (error) {
        return new Response('Failed to fetch prompt', {status: 500});
    }
};

// PATCH (update a single prompt based on the id params)
export const PATCH = async(request, { params }) =>{
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt){
            return new Response('Prompt not found', {staus: 404});
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {staus: 200});
    } catch (error) {
        return new Response('Failed to fecth all prompts', {status: 500});
    }
};

// DELETE (delete a single prompt based on the id params)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response('Prompt deleted', {staus: 200});
    } catch (error) {
        return new Response('Failed to delete prompt', {status: 500});
    }
};