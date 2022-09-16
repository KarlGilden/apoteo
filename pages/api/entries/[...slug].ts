import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../util/db";
import { ObjectId } from 'mongodb';
export default async (req:NextApiRequest, res:NextApiResponse ) => {
  let { db } = await connectToDatabase();
  let { slug } = req.query

  if (req.method === 'PUT') {
    if(slug && slug[0] == "add"){
      try{
        console.log(req.body)
        const entries = db.collection("Entries");
        const result = await entries.insertOne({
          date: new Date(req.body.date),
          data: req.body.data,
          interventions: req.body.interventions,
          errors: req.body.errors,
          sum: req.body.sum
        })
        .then(response => {
          res.status(201).json({response})
        });
      }catch(error: any){
        res.status(500).json(error)
      }
    }
  }

  if (req.method === 'GET') {
        if(slug && slug[0] == "getSingle"){
          try{
            const entries = db.collection("Entries")
            entries.findOne({'_id':new ObjectId(slug[1])})
              .then(function(doc) {
                if(!doc){
                  throw new Error('No record found.');
                }
                console.log(doc);
                res.status(200).json(doc)
  })
          }catch(error: any){
              console.log(error)
              res.status(500).json(error)
            }
        }
  }
}
