import { Schema, Document, model, Types, Model } from 'mongoose';
import { ITransaction } from './transaction.model';

export interface IBlock extends Document {
    block_hash: String;
    depth: Number;
    timestamp: String;
    coinbase: String;
    previous_block_hash: String;
    number_of_transactions: Number;
    transactions: ITransaction[];
}

export interface IBlockModel extends Model<IBlock> {}

const blockSchema = new Schema({
    block_hash: {
        type: String,
        required: true,
        unique: true,
        minlength: 45,
        maxlength: 55,
    },
    depth: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    coinbase: {
        type: String,
        required: true,
    },
    previous_block_hash: {
        type: String,
        required: true,
    },
    number_of_transactions: {
        type: Number,
        required: true,
    },
    transactions: [{ type: Types.ObjectId, ref: 'Transaction' }],
});

export default model<IBlock, IBlockModel>('Block', blockSchema);
