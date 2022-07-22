import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../util/db";
import ISODate from 'mongodb'

export default async (req:NextApiRequest, res:NextApiResponse ) => {
  let { db } = await connectToDatabase();

  if (req.method === 'PUT') {
    try{
      const entries = db.collection("Entries");
      const result = await entries.insertOne({
        date: new Date(req.body.date),
        covid: req.body.covid,
        discharge: req.body.discharge,
        outp: req.body.outp,
        gp: req.body.gp,
        ed: req.body.ed,
        paediatric: req.body.paediatric,
        eylea: req.body.eylea,
        bicillin: req.body.bicillin,
        ferinject: req.body.ferinject,
        binocrit: req.body.binocrit,
        blisterPacks: req.body.blisterPacks,
        aclasta: req.body.aclasta,
        compounding: req.body.compounding,
        yellowCards: req.body.yellowCards,
        issues: req.body.issues
      })
      .then(response => {
        res.status(201).json({response})
      });
    }catch(error: any){
      res.status(500).json(error)
    }

  }

  // get sum of scripts between two dates
  if (req.method === 'GET') {
    try{

      // set start of current month
      var monthStart = new Date();
      monthStart.setDate(1)

      // set end of current month
      var monthEnd = new Date();
      monthEnd.setMonth(monthEnd.getMonth()+1)
      monthEnd.setDate(0)

      const entries = db.collection("Entries")
      const data = await entries.find({
        date: {
          "$gte": monthStart,
          "$lte": monthEnd
        }
      }).toArray()
      .then((ans)=> {
        console.log(ans)
        let sum = 0;
        for(let i=0;i<ans.length;i++){
          sum += ans[i].sum
          console.log(ans)
        }
        res.status(200).json(sum);
      })

      
      
      }catch(error: any){
        console.log(error)
        res.status(500).json(error)
      }

  }
}
