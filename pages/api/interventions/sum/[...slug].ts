import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../util/db";

export default async (req:NextApiRequest, res:NextApiResponse ) => {
    let { db } = await connectToDatabase();
    let { slug } = req.query

    if (req.method === 'GET') {
        if(slug){
            try{
                // set start of current month
                // var monthStart = new Date();
                // monthStart.setDate(1)
          
                // // set end of current month
                // var monthEnd = new Date();
                // monthEnd.setMonth(monthEnd.getMonth()+1)
                // monthEnd.setDate(0)
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
                let sum = 0;
  
                for await (const doc of data) {
                    sum += doc.interventions.length
                }
  
                res.status(200).json(sum);
          
                }catch(error: any){
                  console.log(error)
                  res.status(500).json(error)
                }
            }
      }
}  