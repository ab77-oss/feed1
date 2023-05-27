import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/db";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "PATCH" && req.method !=='DELETE') {
    return res.status(405).end();
  }

  try {
    if (req.method === "GET") {
      const { feedbackId } = req.query;
      const { currentUser } = await serverAuth(req, res);

      if (!feedbackId || typeof feedbackId !== "string") {
        throw new Error("Invalid ID");
      }

      const feedback = await prisma.feedback.findUnique({
        where: {
          id: feedbackId as string
        },
      });

      return res.status(200).json(feedback);
    }
    if (req.method === "PATCH") {
      const { feedbackId } = req.query;
      const { currentUser } = await serverAuth(req, res);
      const { title, description, detail, status } = req.body;

      if (!title || !description || !detail || !status) {
        throw new Error("Missing fields");
      }

      const updatedFeedback = await prisma.feedback.update({
        where: {
          id: feedbackId as string,
        },
        data: {
          title,
          description,
          detail,
          status,
        },
      });
      return res.status(200).json(updatedFeedback);
    } if (req.method === "DELETE") {
      const { feedbackId } = req.query;


      if (!feedbackId || typeof feedbackId !== "string") {
        throw new Error("Invalid ID");
      }

      const feedback = await prisma.feedback.delete({
        where: {
          id: feedbackId as string
        },
      });
      return res.status(200).json(feedback);
    }
  } catch (error) {
    return res.status(400).end();
  }
}
