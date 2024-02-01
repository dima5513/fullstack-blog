import { z } from 'zod'

export const loginSchema = z.object({
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
