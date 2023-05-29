import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";

// Initialize CORS
const cors = Cors({
    methods: ['GET'], // Define the HTTP methods allowed for CORS
  });


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    
    // Apply CORS to the request
  await new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
    
    
    if(req.method !=='GET'){
        return  res.status(405).end();
    }

    try {
        const {currentUser} = await serverAuth(req,res);
        return  res.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
