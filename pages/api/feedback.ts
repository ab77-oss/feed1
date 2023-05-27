import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/db";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { title, description, detail } = req.body;

      const feedback = await prisma.feedback.create({
        data: {
          title,
          description,
          detail,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(feedback);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      let feedbacks;
      if (userId && typeof userId === "string") {
        feedbacks = await prisma.feedback.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        feedbacks = await prisma.feedback.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
      return res.status(200).json(feedbacks);
    }
  } catch (error) {
    return res.status(400).end();
  }
}
