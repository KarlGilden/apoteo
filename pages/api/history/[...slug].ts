import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../util/db";
export default async (req:NextApiRequest, res:NextApiResponse ) => {
    let { db } = await connectToDatabase();
    let { slug } = req.query

    if(!slug){
        return 
    }

    if(req.method == "GET"){
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
                const entries = await db.collection("Entries").aggregate(pipeline).toArray();
                // entries.forEach(doc=>{
                //     console.log(doc)
                // })
                console.log(entries)
                res.status(200).json(entries);
        }catch(error: any){
            console.log(error)
            res.status(500).json(error)
        }
    }
}