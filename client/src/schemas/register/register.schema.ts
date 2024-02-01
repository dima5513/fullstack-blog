import { z } from 'zod'

export const registerSchema = z.object({
    username: z
        .string({
            required_error: 'Логин не должен быть пустым',
        })
        .min(2, {
            message: 'Логин пользователя не должен быть меньше 2 символов',
        })
        .max(15, {
            message: 'Логин пользователя не должен быть больше 15 символов',
        })
        .refine(s => s !== '', { message: 'Пароль не должен быть пустым' }),
    email: z
        .string({
            required_error: 'Почта не должна быть пустой',
        })
        .email({ message: 'Невалидная почта' })
        .refine(s => s !== '', { message: 'Почта не должен быть пустым' }),
    password: z
        .string()
        .min(6, { message: 'Пароль должен быть длиннее или равен 6 символам' })
        .refine(s => s !== '', { message: 'Пароль не должен быть пустым' }),
})
