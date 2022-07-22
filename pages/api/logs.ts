import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../util/db";
import ISODate from 'mongodb'

export default async (req:NextApiRequest, res:NextApiResponse ) => {
  let { db } = await connectToDatabase();

  if (req.method === 'PUT') {
    try{
      let sum = 0;
      for (const key in req.body.data) {
        sum += req.body.data[key];
      }

      console.log(req.body)
      const entries = db.collection("Entries");
      const result = await entries.insertOne({
        date: new Date(req.body.date),
        data: req.body.data,
        issues: req.body.issues,
        sum: sum
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
        let sum = 0;
        for(let i=0;i<ans.length;i++){
          sum += ans[i].sum
        }
        res.status(200).json(sum);
      })

      }catch(error: any){
        console.log(error)
        res.status(500).json(error)
      }

  }
}
