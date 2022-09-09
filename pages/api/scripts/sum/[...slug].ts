import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../util/db";

export default async (req:NextApiRequest, res:NextApiResponse ) => {
    let { db } = await connectToDatabase();
    let { slug } = req.query

    if (req.method === 'GET') {
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
                // get entries from mongodb
                const entries = db.collection("Entries")
    
                // get data by date
                const data = entries.aggregate(pipeline)
                let sumAll = 0;
                let sumDischarge = 0;
                let sumOutp= 0;
                let sumGp= 0;
                let sumEd= 0;
    
                for await (const doc of data) {
                  sumAll += doc.sum
                  sumDischarge += doc.data.discharge.sum
                  sumOutp += doc.data.outp.sum
                  sumGp += doc.data.gp.sum
                  sumEd += doc.data.ed.sum
                }

                  const response = {
                    sumAll: sumAll,
                    sumDischarge: sumDischarge,
                    sumEd: sumEd,
                    sumGp: sumGp,
                    sumOutp: sumOutp
                  }
                  res.status(200).json(response);
          
                }catch(error: any){
                  console.log(error)
                  res.status(500).json(error)
                }
            }
      }
}  