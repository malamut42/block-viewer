import { Router, Response } from 'express';
import { ITransaction, Transaction } from '../models';
import { IMongoError } from '../error';

const router = Router();

router.get('/', async (req, res: Response<ITransaction[] | IMongoError>, next) => {
    try {
        const trans = await Transaction.find();
        res.status(200).json(trans);
    } catch (err) {
        res.status(500).json({ message: err.message } as IMongoError);
    }
});

router.get('/:id', async (req, res: Response<ITransaction | null | IMongoError>, next) => {
    try {
        const tran = await Transaction.findOne({
            number: req.params.id,
        });

        res.status(200).json(tran);
    } catch (err) {
        res.status(500).json({ message: err.message } as IMongoError);
    }
});

export default router;
