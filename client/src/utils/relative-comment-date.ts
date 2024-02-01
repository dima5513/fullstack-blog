export const relativeCommentDate = (dateISOString: string): string => {
    const rtf = new Intl.RelativeTimeFormat('ru', {
        style: 'long',
        numeric: 'auto',
        localeMatcher: 'best fit',
    })

    const dateOfCreatedPost = new Date(dateISOString).getTime()

    const difference = Math.floor((dateOfCreatedPost - Date.now()) / 1000)
    const segments = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365]
    const units: Intl.RelativeTimeFormatUnit[] = [
        'second',
        'minute',
        'hour',
        'day',
        'week',
        'month',
        'year',
    ]

    const foundedUnitIndex = segments.findIndex(
        segment => segment > Math.abs(difference)
    )

    const divisor: number = foundedUnitIndex
        ? segments[foundedUnitIndex - 1]
        : 1

    return rtf.format(Math.ceil(difference / divisor), units[foundedUnitIndex])
}
