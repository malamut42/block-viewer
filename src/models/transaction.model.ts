import { Document, Schema, model, Types } from 'mongoose';
import { IAccount } from './account.model';

export interface ITransaction extends Document {
    hash: String;
    from_address: IAccount;
    to_address: IAccount;
    amount: String;
    fee: String;
}

const transactionSchema = new Schema({
    hash: {
        type: String,
        required: true,
        unique: true,
        minlength: 45,
        maxlength: 55,
    },
    from_address: {
        type: Types.ObjectId,
        ref: 'Account',
    },
    to_address: {
        type: Types.ObjectId,
        ref: 'Account',
    },
    amount: {
        type: String,
        required: true,
    },
    fee: {
        type: String,
        required: true,
    },
});

export default model<ITransaction>('Transaction', transactionSchema);
