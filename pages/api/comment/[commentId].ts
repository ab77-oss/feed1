import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/db";

// Initialize CORS
const cors = Cors({
  methods: ['GET'], // Define the HTTP methods allowed for CORS
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