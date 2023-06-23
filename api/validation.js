import { body } from "express-validator";

export const registerValidation = [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body('name').isLength({ min: 3 }),
    body('avatarUrl').optional().isURL(),

]

export const loginValidation = [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
]

export const createEmployees = [
    body("name").isString(),
    body("subdivision").isString(),
    body('mig_cart').isLength({ min: 11 }).isString(),
    body("patent").isLength({min: 11}).isString(),
    body('time_mig_cart').isTime()
]