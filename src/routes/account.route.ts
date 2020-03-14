import { Router, Response } from 'express';
import { IAccount, Account } from '../models';
import { IMongoError } from '../error';

const router = Router();

router.get('/', async (req, res: Response<IAccount[] | IMongoError>, next) => {
    try {
        const accounts = await Account.find();
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message } as IMongoError);
    }
});

router.get('/:id', async (req, res: Response<IAccount | null | IMongoError>, next) => {
    try {
        const account = await Account.findOne({
            address: req.params.id,
        });
        res.status(200).json(account);
    } catch (err) {
        res.status(500).json({ message: err.message } as IMongoError);
    }
});

export default router;
