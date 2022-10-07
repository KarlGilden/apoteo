import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../util/db";
import {Log} from '../../../types/Log'

export default async (req:NextApiRequest, res:NextApiResponse ) => {
  let { db } = await connectToDatabase();
  let { slug } = req.query

  if (req.method === 'PUT') {
    if(slug && slug[0] == "add"){
      try{
        console.log(req.body)
        const filter = { "date": new Date(req.body.date)};
        const options = { upsert: true };
        const updateDoc = {
          $set: {
              data: req.body.data,
              interventions: req.body.interventions,
              errors: req.body.errors,
              sum: req.body.sum
          },
          };
        const entries = db.collection("Entries");
        const result = await entries.updateOne(filter, updateDoc, options)
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
            entries.findOne({'date': new Date(slug[1])})
              .then(function(doc) {
                console.log(doc);
                if(!doc){
                  const newDoc: Log = {
                    date: new Date(slug ? slug[1] : ""),
                    data: {
                      discharge: {
                        compounding: 0,
                        yellowCards: 0,
                        blisterPacks: 0,
                        paediatric: 0,
                        other: 0,
                        sum: 0,
                      },
                      outp: {
                        eylea: 0,
                        bicillin: 0,
                        ferinject: 0,
                        binocrit: 0,
                        aclasta: 0,
                        compounding: 0,
                        yellowCards: 0,
                        blisterPacks: 0,
                        paediatric: 0,
                        other: 0,
                        sum: 0,
                      },
                      gp: {
                        compounding: 0,
                        yellowCards: 0,
                        blisterPacks: 0,
                        paediatric: 0,
                        other: 0,
                        sum: 0,
                      },
                      ed: {
                        compounding: 0,
                        yellowCards: 0,
                        blisterPacks: 0,
                        paediatric: 0,
                        other: 0,
                        sum: 0,
                      }
                    },
                    interventions: [],
                    errors: [],
                    sum: 0
                  }
                  res.status(200).json(newDoc)
                }
                res.status(200).json(doc)
  })
          }catch(error: any){
              console.log(error)
              res.status(500).json(error)
            }
        }
  }
}
