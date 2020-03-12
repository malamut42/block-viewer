import { Router, Response } from 'express';
import { ITransaction, Transaction } from '../models';
import { IMongoError } from '../error';

const router = Router();

router.get('/', async (req, res: Response<ITransaction[] | IMongoError>) => {
    try {
        const trans = await Transaction.find()
            .populate('from_address')
            .populate('to_address');
        res.status(200).json(trans);
    } catch (err) {
        res.status(500).json({ message: err.message } as IMongoError);
    }
});

router.get(
    '/:id',
    async (req, res: Response<ITransaction | null | IMongoError>) => {
        try {
            const tran = await Transaction.findOne({
                hash: req.params.id,
            })
                .populate('from_address')
                .populate('to_address');

            res.status(200).json(tran);
        } catch (err) {
            res.status(500).json({ message: err.message } as IMongoError);
        }
    }
);

export default router;
