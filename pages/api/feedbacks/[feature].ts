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


  if (req.method !== "GET" ) {
    return res.status(405).end();
  }

  try {
    if (req.method === "GET") {
      const { feature} = req.query;


     if (feature==='UX' || feature==='UI' || feature==='Enhancement' || feature ==='Bug' || feature==='Feature'){

        const feedback = await prisma.feedback.findMany({
            where: {
              description: feature,
            },

          });
          
          console.log('this feedback:',feedback)
          return res.status(200).json(feedback);
          
        }else if(feature ==='ALL'){
            const feedback = await prisma.feedback.findMany({
              include: {
                comments:true,
              },

            });
              return res.status(200).json(feedback);

        } else if(feature==='In Progress' || feature==='Planned' || feature==='Live' ){

          const feedback = await prisma.feedback.findMany({
              where: {
                status: feature,
              },
              include:{
                comments:true
              }
      
            });
            return res.status(200).json(feedback);
          }
      }
    
  } catch (error) {
    return res.status(400).end();
  }
}
