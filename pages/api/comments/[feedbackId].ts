import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/db";
import serverAuth from "@/libs/serverAuth";

// Initialize CORS
const cors = Cors({
  methods: ['GET', 'POST'], // Define the HTTP methods allowed for CORS
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

 // Apply CORS to the request
 await new Promise((resolve, reject) => {
  cors(req, res, (result) => {
    if (result instanceof Error) {
      return reject(result);
    }
    return resolve(result);
  });
});


  if (req.method !== "GET" && req.method !=="POST") {
    return res.status(405).end();
  }

  try {
    if (req.method === "GET") {
      const { feedbackId } = req.query;
      const { currentUser } = await serverAuth(req, res);

      if (!feedbackId || typeof feedbackId !== "string") {
        throw new Error("Invalid ID");
      }
      const comments = await prisma.comment.findMany({
        where: {
          feedbackId,
        },
        include: {
          replies: {
            include: {
              repliesToreplies:true
            },
          },
        },

      });

      return res.status(200).json(comments);
    }
    if(req.method ==="POST"){

        const { content} = req.body;
        const {feedbackId} = req.query;
        const { currentUser } = await serverAuth(req, res);
        console.log(content, feedbackId, currentUser)

        if (!feedbackId || typeof feedbackId !== "string") {
            throw new Error("Invalid ID");
          }

        const comment = await prisma.comment.create({
            data:{
                content,
                userId:currentUser.id,
                feedbackId
            }
          });
          return res.status(200).json(comment);
    }
   
  } catch (error) {
    return res.status(400).end();
  }
}
