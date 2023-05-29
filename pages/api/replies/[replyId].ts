
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
      const { replyId } = req.query;

      if (!replyId || typeof replyId !== "string") {
        throw new Error("Invalid ID");
      }

      const repliesToreplies = await prisma.replies.findMany({
        where: {
          replyId
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
       
        return res.status(200).json(repliesToreplies);
    }
    if(req.method ==="POST"){

        const { replyContent} = req.body;
        const { replyId} = req.query;
        const { currentUser } = await serverAuth(req, res);

        console.log('content:', replyContent, 'replyId:',replyId, 'currentUser:', currentUser.name)
        
        if (!replyId || typeof replyId !== "string") {
            throw new Error("Invalid ID");
          }

        const username = await prisma.reply.findUnique({
                where: {
                    id:replyId
                },
                include:{
                    user:{
                        select:{
                            username:true,

                        }
                    }
                }
        });
        
        console.log(username)
       
        const reply = await prisma.replies.create({
            data:{
                replyContent,
                userId:currentUser.id,
                replyId,
                replyToinTo:username?.user.username || " ",
                
            }
          });
          console.log(reply)
          return res.status(200).json(reply);
    }
   
  } catch (error) {
    return res.status(400).end();
  }
}
