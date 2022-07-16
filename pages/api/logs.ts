import db from '../../aws/db.js';
import { marshall } from "@aws-sdk/util-dynamodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import {v4 as uuidv4} from 'uuid';

export default async function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'PUT') {
      console.log(req.body)
        var item = {
          'id': Date.now() + Math.floor(Math.random() * 100),
          "date": req.body.date,
          "covid": req.body.covid,
          "discharge": req.body.discharge,
          "outp": req.body.outp,
          "gp": req.body.gp,
          "ed": req.body.ed,
          "paediatric": req.body.paediatric,
          "eylea": req.body.eylea,
          "bicillin": req.body.bicillin,
          "ferinject": req.body.ferinject,
          "binocrit": req.body.binocrit,
          "blisterPacks": req.body.blisterPacks,
          "aclasta": req.body.aclasta,
          "compounding": req.body.compounding,
          "yellowCards": req.body.yellowCards,
          "issues": req.body.issues
        }
        console.log(item)
        var putParams = {
            TableName: 'Logs',
            Item: marshall(item),
          };
    
          db.putItem(putParams, function(err, data) {
            if (err) {
              console.log("Error", err);
              res.status(500).json(err)
            } else {
              console.log("Success", data);
              res.status(200).json(data)
            }
          });
      }

      if (req.method === 'GET') {
        var getParams = {
            TableName: 'Logs',
            Key: {
                'id': {N: '1'}
            },
            ProjectionExpression: 'content'
          };
    
          db.getItem(getParams, function(err, data) {
            if (err) {
              console.log("Error", err);
              res.status(404).json(err)
            } else {
              console.log("Success", data);
              res.status(200).json(data)
            }
          });
      }
}
