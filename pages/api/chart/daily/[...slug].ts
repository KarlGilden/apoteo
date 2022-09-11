import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../util/db";
import { ObjectId } from 'mongodb';
export default async (req:NextApiRequest, res:NextApiResponse ) => {
  let { db } = await connectToDatabase();
  let { slug } = req.query

  if(slug){
    try{
        const pipeline = [
            {'$match': {
                'date': {
                  "$gte": new Date(slug[0]),
                  "$lte": new Date(slug[1])
                }
              }}
          ];    
          const entries = db.collection("Entries")
          const data = entries.aggregate(pipeline)

          let dailyScripts: number[] = [];

          let dates: string[] = [];

          for await (const doc of data) {
            console.log("aaa")
            dailyScripts = [...dailyScripts, doc.sum]
            dates = [...dates, new Date(doc.date).toLocaleDateString('en-CA')]
          }          
          console.log("Labels:" + dates)
          console.log("Data:" + dailyScripts)
          
          res.status(200).json({dates, dailyScripts})

      }catch(error: any){
        console.log(error)
        res.status(500).json(error)
      }
  }
}