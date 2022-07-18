import { marshall } from "@aws-sdk/util-dynamodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import db from '../../util/db';

export default async (req:NextApiRequest, res:NextApiResponse ) => {
  try {
    const { slug } = req.body;
    const entries = await db.collection('entries').get();
    const entriesData = entries.docs.map(entry => entry.data());
    console.log(entriesData)
    res.status(200).json(entriesData)
  }catch(error:any){
    res.status(400).end();
  }
}
