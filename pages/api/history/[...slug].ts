import { ObjectId } from 'mongodb';
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

    if(req.method == "PUT"){
        try{
            const entries = db.collection("Entries")
            const filter = { "_id": new ObjectId(slug[0]) };

            const updateDoc = {
            $set: {
                data: req.body.data,
                interventions: req.body.interventions,
                errors: req.body.errors,
                sum: req.body.sum
            },
            };
            const result = await entries.updateOne(filter, updateDoc);
            console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );

            res.status(200).json(result)

        }catch(error: any){
            console.log(error)
            res.status(500).json(error)
        }
    }


}