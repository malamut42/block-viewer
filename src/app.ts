import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { PORT, DB } from './constants/api.constants';
import { accountRoute, blockRoute, transactionRoute } from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/blocks', blockRoute);
app.use('/accounts', accountRoute);
app.use('/transactions', transactionRoute);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/', (_req, res, _next) => {
    res.send({});
});

app.listen(PORT, () => console.log(`Listening on port :${PORT}...`));

/**
 * нужно сделать оформление для сайта-blockchain explorer-a.
Примеры:
- https://www.blockchain.com/explorer
- https://etherscan.io/
Конкретнее:
1) заходим на сайт у нас есть главная страница, там типо фотографии нашей команды, какое-то описание (one-pager наверное, но не обязательно — тебе виднее)
2) дальше есть страница, у которой основной элемент — таблица, в которой есть информация о блоках блокчейна: 
есть колонки "Хэш блока" (где-то 50 символов, +-, все конечно отобразить не сможем, поэтому в середине нужно троеточие), 
"номер блока" (число, от 1 до 9 символов), 
"время-дата создания блока" и еще пару колонок может добавиться. 
"хеш блока" и "номер блока" — кликабельные, кликнув по ним попадаем на страницу блока.
3) "Страница блока". Здесь указывается список параметров блока, от кого транзакция, кому, сколько денег, время и дата создания и прочее. 
От кого и кому (адрес) — это текстовое поле, где-то 45+- символов длиной. Адреса тоже кликабельные, кликнув по ним попадаем на страницу "Аккаунт".
4) здесь отображается адрес аккаунта, QR-код на адрес его страницы, сколько денег у него на счету, еще может пару параметров. 
Внизу — список транзакций (как в странице блока), которые прошли от и в текущий аккаунт.

Все эти параметры будут браться из БД, которая заполняется нашим бэкендом (MongoDB вроде).
Вооот
 */

/**
  * Вот какие у нас сейчас (предварительно) таблицы и поля в Mongo:
1) Block: block_hash, nonce, miner_address, block_number, transactions_list
2) Transaction: hash, from_address, to_address, amount, fee
3) Account: address, balance, tranasction_list
  */
