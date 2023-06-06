import { query } from 'express-validator';

const validationPaginate = [
    query("pagination[limit]").optional().isNumeric().withMessage('Limit phải là kiểu số'),
    query("pagination[page]").optional().isNumeric().withMessage('Page phải là kiểu số'),
];
export default validationPaginate;