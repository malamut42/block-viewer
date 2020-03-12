import { Schema, Document, model, Types } from 'mongoose';
import { ITransaction } from './transaction.model';
import { IAccount } from './account.model';

export interface IBlock extends Document {
    block_hash: String;
    block_number: String;
    miner_address: IAccount;
    nonce: Date;
    transactions_list: ITransaction[];
}

const blockSchema = new Schema({
    block_hash: {
        type: String,
        required: true,
        unique: true,
        minlength: 45,
        maxlength: 55,
    },
    block_number: {
        type: String,
        required: true,
        unique: true,
    },
    miner_address: {
        type: Types.ObjectId,
        ref: 'Account',
    },
    nonce: {
        type: Date,
        required: true,
    },
    transactions_list: [{ type: Types.ObjectId, ref: 'Transaction' }],
});

export default model<IBlock>('Block', blockSchema);
