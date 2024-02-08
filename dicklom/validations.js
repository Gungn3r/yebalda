import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  ];

  export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя').isLength({ min: 2 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
  ];

  export const postCreateValidation = [
    body('productName', 'Введите наименование товара').isLength({ min: 1 }).isString(),
    body('volume', 'Введите объём товара в тоннах').isNumeric(),
    body('priceWithVAT', 'Введите стоимость за 1 тонну с учётом НДС').isNumeric(),
    body('deliveryBasis', 'Введите базис поставки').isLength({ min: 1 }).isString(),
    body('deliveryPlace', 'Укажите место поставки').isLength({ min: 1 }).isString(),
    body('counterpartyOption', 'Укажите опцию контрагента').isIn(['single', 'multiple']),
    body('binIin').optional().isString(), // Поле binIin не обязательно
    body('additionalInfo').optional().isString(), // Поле additionalInfo не обязательно
  ];
