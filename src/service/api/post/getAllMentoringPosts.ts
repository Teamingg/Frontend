import MentoringPosts from "@/types/post/mentoringPosts";
import {client} from "../instance/client";
import {createServerInstance} from "@/service/api/instance/server";

export interface getAllMentoringPostsProps {
	nextCursor?: number;
}

export const getAllMentoringPosts = async ({
																						 nextCursor,
																					 }: getAllMentoringPostsProps): Promise<MentoringPosts> => {
	const response = await client.get(
		nextCursor ? `/mentoring/posts?cursor=${nextCursor}` : "/mentoring/posts"
	);

	return response.data.data;
};

export const getAllServerMentoringPosts = async ({
																									 nextCursor,
																								 }: getAllMentoringPostsProps): Promise<MentoringPosts> => {
	const server = await createServerInstance()
	const response = await server.get(
		nextCursor ? `/mentoring/posts?cursor=${nextCursor}` : "/mentoring/posts"
	);

	return response.data.data;
};