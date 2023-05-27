import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/db";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !=="POST") {
    return res.status(405).end();
  }

  try {
    if (req.method === "GET") {
      const { commentId } = req.query;

      if (!commentId || typeof commentId !== "string") {
        throw new Error("Invalid ID");
      }

      const replies = await prisma.reply.findMany({
        where: {
          commentId:commentId 
        },
        include:{
            user:{
                select:{
                    name:true,
                    username:true,
                    image:true
                }
            },
           
        }
        })

        return res.status(200).json(replies);
    }
    if(req.method ==="POST"){

        const { content} = req.body;
        const {commentId} = req.query;
        const { currentUser } = await serverAuth(req, res);

        
        if (!commentId || typeof commentId !== "string") {
            throw new Error("Invalid ID");
          }

        const username = await prisma.comment.findUnique({
                where: {
                    id:commentId
                },
                include:{
                    user:{
                        select:{
                            username:true,

                        }
                    }
                }
        })

        const reply = await prisma.reply.create({
            data:{
                content,
                userId:currentUser.id,
                commentId,
                replyinTo:username?.user.username || " ",
                
            }
          });
          return res.status(200).json(reply);
    }
   
  } catch (error) {
    return res.status(400).end();
  }
}
