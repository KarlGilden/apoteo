import db from '../../aws/db.js';
import { marshall } from "@aws-sdk/util-dynamodb";
import type { NextApiRequest, NextApiResponse } from 'next'

type Log = {
    id: number,
    content: string,
}

type IParams = {
    TableName: string,
    Item: Log,
}
export default async function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'PUT') {
        var putParams = {
            TableName: 'Logs',
            Item: marshall({
              'id': 1,
              'content': "content"
            })
          };
    
          db.putItem(putParams, function(err, data) {
            if (err) {
              console.log("Error", err);
            } else {
              console.log("Success", data);
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
