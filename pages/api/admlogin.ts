// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const https = require('https');

type IReqOption = {
  method: string | undefined;
  redirect: RequestRedirect | undefined;
  headers: any;
  agent: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { login, password } = req.body.user;

  let loginHeaders = new Headers();
  loginHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  loginHeaders.append(
    'Authorization',
    'Basic ' + btoa(unescape(encodeURIComponent(login + ':' + password)))
  );

  //Это сделано для локального хоста, вообще внутри сети или внутри одного сервера это будет лишним
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  let requestOptions: IReqOption = {
    method: 'POST',
    headers: loginHeaders,
    redirect: 'follow',
    agent: httpsAgent,
  };

  await fetch('https://78.140.15.84:8443/persident/admlogin', requestOptions)
    .then((response) => response.text())
    .then((result) => {
      res.status(200).json(JSON.parse(result));
    })
    .catch((error) => console.log('error', error));
}