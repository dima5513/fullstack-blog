import { z } from 'zod'

export const createPostSchema = z.object({
    title: z
        .string({
            required_error: 'Заголовок поста не должен быть пустым',
        })
        .min(10, {
            message: 'Заголовок поста должен быть не меньше 10 символов',
        })
        .max(150, {
            message: 'Заголовок поста не должен быть длиннее 150 символов',
        })
        .refine(h => h !== '', {
            message: 'Заголовок поста не должен быть пустым',
        }),
    content: z
        .string({
            required_error: 'Контент не должен быть пустой',
        })
        .min(100, {
            message:
                'Количество символов для контента должно быть не меньше 100',
        })
        .max(10000, {
            message: 'Длина конента не должна быть длиннее 10000 символов',
        })

        .refine(h => h !== '', {
            message: 'Контент не должен быть пустой',
        }),
    category: z
        .string({
            required_error: 'Категория поста должна присутствовать ',
        })
        .refine(
            value =>
                value === 'design' ||
                value === 'administration' ||
                value === 'development',
            { message: 'Недопустимое значение' }
        ),
})
