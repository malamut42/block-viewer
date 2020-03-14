import { Router, Response } from 'express';
import { IBlock, Block } from '../models';
import { IMongoError } from '../error';

const router = Router();

router.get('/', async (req, res: Response<IBlock[] | IMongoError>, next) => {
    try {
        const blocks = await Block.find().populate('transactions');
        res.status(200).json(blocks);
    } catch (err) {
        res.status(500).json({ message: err.message } as IMongoError);
    }
});

router.get('/block', async (req, res: Response<IBlock | null | IMongoError>, next) => {
    const { block_hash, depth } = req.query;
    const condition = block_hash ? { block_hash } : depth ? { depth } : '';

    try {
        const block = await Block.findOne(condition).populate('transactions');

        res.status(200).json(block);
    } catch (err) {
        res.status(500).json({ message: err.message } as IMongoError);
    }
});

export default router;
