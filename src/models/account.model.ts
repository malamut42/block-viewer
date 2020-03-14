import { Document, Schema, model, Model, Types } from 'mongoose';
import { ITransaction } from '.';
import { IBlock } from './block.model';

export interface IAccount extends Document {
    address: String;
    value: Number;
    transactions: ITransactionInfo[];
}

export interface ITransactionInfo extends Document {
    number: ITransaction['number'];
    block_hash: IBlock['block_hash'];
}

export interface IAccountModel extends Model<IAccount> {
    transactions: Types.Array<Model<ITransactionInfo>>;
}

const accountSchema = new Schema({
    address: {
        type: String,
        unique: true,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    transactions: [
        new Schema({
            number: Number,
            block_hash: String,
        }),
    ],
});

export default model<IAccount, IAccountModel>('Account', accountSchema);
