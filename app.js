import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createHttpError from 'http-errors';

import indexRouter from './routes/index.js';

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

app.use('/', indexRouter);

app.use((_1, _2, next) => {
  next(createHttpError(404));
});

app.use((err, req, res, _) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export default app;
