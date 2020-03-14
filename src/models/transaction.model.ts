import { Document, Schema, model, Model } from 'mongoose';

export interface ITransaction extends Document {
    number: Number;
    type: String;
    from: String;
    to: String;
    value: Number;
    fee: Number;
    timestamp: String;
    data: String;
    signature: Boolean;
}

export interface ITransactionModel extends Model<ITransaction> {}

const transactionSchema = new Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
    signature: {
        type: Boolean,
        required: true,
    },
});

export default model<ITransaction, ITransactionModel>('Transaction', transactionSchema);
