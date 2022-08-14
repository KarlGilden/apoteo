import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../util/db";

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
              issues: req.body.issues,
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




  // get sum of scripts between two dates
  if (req.method === 'GET') {

    if(slug && slug[0] == 'sum'){
        try{
            // get entries from mongodb
            const entries = db.collection("Entries")

            // get data by date
            const data = await entries.find({
              date: {
                "$gte": new Date(slug[1]),
                "$lte": new Date(slug[2])
              }
            }).toArray()
            .then((ans)=> {

              // sum of all scripts
              let sumAll = 0;
              for(let i=0;i<ans.length;i++){
                sumAll += ans[i].sum
              }

              // sum of all discharge
              let sumDischarge = 0;
              for(let i=0;i<ans.length;i++){
                sumDischarge += ans[i].data.discharge.sum
              }

              // sum of all outpatient
              let sumOutp= 0;
              for(let i=0;i<ans.length;i++){
                sumOutp += ans[i].data.outp.sum
              }

              // sum of all gp
              let sumGp= 0;
              for(let i=0;i<ans.length;i++){
                sumGp += ans[i].data.gp.sum
              }

              // sum of all ed
              let sumEd= 0;
              for(let i=0;i<ans.length;i++){
                sumEd += ans[i].data.ed.sum
              }

              const response = {
                sumAll: sumAll,
                sumDischarge: sumDischarge,
                sumEd: sumEd,
                sumGp: sumGp,
                sumOutp: sumOutp
              }
              res.status(200).json(response);
            })
      
            }catch(error: any){
              console.log(error)
              res.status(500).json(error)
            }
        }

        if(slug && slug[0] == 'sumInterventions'){
          try{
              // set start of current month
              // var monthStart = new Date();
              // monthStart.setDate(1)
        
              // // set end of current month
              // var monthEnd = new Date();
              // monthEnd.setMonth(monthEnd.getMonth()+1)
              // monthEnd.setDate(0)
        
              const entries = db.collection("Entries")
              const data = await entries.find({
                date: {
                  "$gte": new Date(slug[1]),
                  "$lte": new Date(slug[2])
                }
              }).toArray()
              .then((ans)=> {
                
                let sum = 0;
                for(let i=0;i<ans.length;i++){
                  sum += ans[i].issues.length
                }
                res.status(200).json(sum);
              })
        
              }catch(error: any){
                console.log(error)
                res.status(500).json(error)
              }
          }

        if(slug && slug[0] == 'allInterventions'){
          try{        
              const entries = db.collection("Entries")
              const data = await entries.find({
                date: {
                  "$gte": new Date(slug[1]),
                  "$lte": new Date(slug[2])
                }
              }).toArray()
              .then((ans)=> {
                
                let interventions: Object[] = [];
                for(let i=0;i<ans.length;i++){
                    interventions = [...interventions, ...ans[i].issues]
                }
                res.status(200).json(interventions);
              })
        
              }catch(error: any){
                console.log(error)
                res.status(500).json(error)
              }
          }
  }
}
