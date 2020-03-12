import { Document, Schema, model, Types } from 'mongoose';
import { ITransaction } from '.';

export interface IAccount extends Document {
    address: String;
    balance: String;
    transaction_list: ITransaction[];
}

const accountSchema = new Schema({
    address: {
        type: String,
        unique: true,
        required: true,
    },
    balance: {
        type: String,
        required: true,
    },
    transaction_list: {
        type: [{ type: Types.ObjectId, ref: 'Transaction' }],
    },
});

export default model<IAccount>('Account', accountSchema);
