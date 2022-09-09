import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../util/db";

export default async (req:NextApiRequest, res:NextApiResponse ) => {
    let { db } = await connectToDatabase();
    let { slug } = req.query
    console.log(slug)
    if(req.method == "GET"){
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
                let interventions: Object[] = [];
  
                for await (const doc of data) {
                  interventions = [...interventions, ...doc.interventions]
                }
                console.log(interventions)
                res.status(200).json(interventions);
          
                }catch(error: any){
                  console.log(error)
                  res.status(500).json(error)
                }
            }
    }
}