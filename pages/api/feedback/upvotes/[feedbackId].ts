import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/db";
import serverAuth from "@/libs/serverAuth";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "PATCH") {
    return res.status(405).end();
  }

  try {

    if (req.method === "PATCH") {
      const { feedbackId } = req.query;
      const { currentUser } = await serverAuth(req, res);
   
     

      console.log('count',   'feedbackId:', feedbackId)

      const feedbackUpvotes = await prisma.feedback.findUnique({
        where: {
          id: feedbackId as string
        },
       select: {
          upvotes:true
          }
        });


      const updatedFeedback = await prisma.feedback.update({
        where: {
          id: feedbackId as string,
        },
        data: {
        upvotes: (feedbackUpvotes?.upvotes ?? 0) + 1 ,
        
        },
      });

      return res.status(200).json(updatedFeedback);

    } if (req.method === "GET") {
      const { feedbackId } = req.query;
   

      if (!feedbackId || typeof feedbackId !== "string") {
        throw new Error("Invalid ID");
      }

      const feedback = await prisma.feedback.findUnique({
        where: {
          id: feedbackId as string
        },
      });

      return res.status(200).json(feedback?.upvotes);
    }






  } catch (error) {
    return res.status(400).end();
  }

}
