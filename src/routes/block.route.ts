import { Router, Response } from 'express';
import { IBlock, Block } from '../models';
import { IMongoError } from '../error';

const router = Router();

router.get('/', async (req, res: Response<IBlock[] | IMongoError>) => {
    try {
        const blocks = await Block.find()
            .populate('miner_address')
            .populate('transactions_list');
        res.status(200).json(blocks);
    } catch (err) {
        res.status(500).json({ message: err.message } as IMongoError);
    }
});

router.get(
    '/block',
    async (req, res: Response<IBlock | null | IMongoError>) => {
        const { block_hash, block_number } = req.query;
        const condition = block_hash
            ? { block_hash }
            : block_number
            ? { block_number }
            : '';

        try {
            const block = await Block.findOne(condition)
                .populate('miner_address')
                .populate('transactions_list');
                
            res.status(200).json(block);
        } catch (err) {
            res.status(500).json({ message: err.message } as IMongoError);
        }
    }
);

export default router;
