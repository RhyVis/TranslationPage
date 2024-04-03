import express from 'express';
import axios from 'axios';
import { conf } from '../bin/www';

const router = express.Router();
const axiosIns = axios.create();

var config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'dummy'
  }
};

router.get('/', (_, res) => {
  res.render('index', {
    title: 'Translation',
    data: 'Result Text',
    alts: ['Alternative Text']
  });
});

router.post('/', async (req, res) => {
  try {
    config.headers.Authorization = `Bearer ${conf.token}`;
    var reqData = req.body;
    reqData.text = reqData.text.replace(/[\r\n]/g, ' ');
    const resData = await axiosIns.post(conf.server, reqData, config);
    const { data, alternatives, id, method } = resData.data;
    var obj;
    if (data != undefined && alternatives != null) {
      obj = {
        title: 'Translation',
        data: data,
        alts: alternatives
      }
      console.log('> Received resp with: %s (%s)', id, method);
    } else {
      obj = {
        title: 'Translation',
        data: '<Translation Failed>',
        alts: ['<Translation Failed>']
      }
      console.log('> Received null response with: %s (%s)', id, method);
    }
    res.render('index', obj);
  } catch (err) {
    res.status(500);
    res.render('error', { message: 'Internal Error', error: err });
  }
})

export default router;
