import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDB(); //Connect to database

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');

        return new Response(JSON.stringify(prompts), { staus: 200 });

    } catch (error) {
        return new Response('Failed to fecth all prompts', {status: 500});
    }
}