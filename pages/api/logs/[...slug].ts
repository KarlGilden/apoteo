import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../util/db";
import {Issue} from '../../../types/Log'
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

  // get sum of scripts between two dates
  if (req.method === 'GET') {

    if(slug && slug[0] == 'sum'){
        try{
          const pipeline = [
            {'$match': {
                'date': {
                  "$gte": new Date(slug[1]),
                  "$lte": new Date(slug[2])
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

        if(slug && slug[0] == 'sumInterventions'){
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
                      "$gte": new Date(slug[1]),
                      "$lte": new Date(slug[2])
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

          if(slug && slug[0] == 'sumErrors'){
            try{
                const pipeline = [
                  {'$match': {
                      'date': {
                        "$gte": new Date(slug[1]),
                        "$lte": new Date(slug[2])
                      }
                    }}
                ]; 
  
                const entries = db.collection("Entries")
                const data = entries.aggregate(pipeline)
                let sum = 0;
  
                for await (const doc of data) {
                    sum += doc.errors.length
                }
  
                res.status(200).json(sum);
          
                }catch(error: any){
                  console.log(error)
                  res.status(500).json(error)
                }
            }

        if(slug && slug[0] == 'getInterventions'){
          try{     
            const pipeline = [
              {'$match': {
                  'date': {
                    "$gte": new Date(slug[1]),
                    "$lte": new Date(slug[2])
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
        
        if(slug && slug[0] == "getErrors"){
          try{    
            const pipeline = [
              {'$match': {
                  'date': {
                    "$gte": new Date(slug[1]),
                    "$lte": new Date(slug[2])
                  }
                }}
            ];    
            const entries = db.collection("Entries")
            const data = entries.aggregate(pipeline)
            let errors: Object[] = [];

            for await (const doc of data) {
              errors = [...errors, ...doc.errors]
            }
              

            res.status(200).json(errors);
      
            }catch(error: any){
              console.log(error)
              res.status(500).json(error)
            }
        }
  }
}
