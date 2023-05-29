
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/db";




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {



  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "GET") {
      const { commentId } = req.query;
     

      if (!commentId || typeof commentId !== "string") {
        throw new Error("Invalid ID");
      }

      const comments = await prisma.comment.findUnique({
        where: {
          id:commentId
        },
        include: {
            user: {
                select: {
                    name:true,
                    username:true,
                    image:true
                }
            }

        }
      });

      return res.status(200).json(comments);
    }
   
  } catch (error) {
    return res.status(400).end();
  }
}