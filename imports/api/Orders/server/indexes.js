import createIndex from '../../../modules/server/create-index';
import Orders from '../Orders';

createIndex(Orders, { owner: 1 });
