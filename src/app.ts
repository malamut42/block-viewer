import cors from 'cors';
import express from 'express';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';

import { accountRoute, blockRoute, transactionRoute } from './routes';
import { Account, Transaction, Block } from './models';

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/blocks', blockRoute);
app.use('/accounts', accountRoute);
app.use('/transactions', transactionRoute);

const DB = process.env.DB || '';
const PORT = process.env.PORT || '3000';
const MONGO_CONFIG = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

connect(DB, MONGO_CONFIG);

app.listen(PORT, () => console.log(`Listening on port :${PORT}...`));
