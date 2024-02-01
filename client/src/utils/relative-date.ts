export const relativeDate = (dateISOString: string): string => {
    const rtf = new Intl.RelativeTimeFormat('ru', {
        style: 'long',
        numeric: 'auto',
        localeMatcher: 'best fit',
    })
    const dtf = new Intl.DateTimeFormat('ru', {
        minute: 'numeric',
        hour: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const dateOfCreatedPost = new Date(dateISOString).getTime()

    const difference: number = Math.round(
        (dateOfCreatedPost - Date.now()) / 1000
    )

    const segments: number[] = [1, 60, 3600]

    const units: Intl.RelativeTimeFormatUnit[] = ['second', 'minute', 'hour']

    let foundedUnitIndex: number = 0

    const absDifference = Math.abs(difference)

    if (absDifference > 3600 * 24) return dtf.format(new Date(dateISOString))

    if (absDifference >= 0 && absDifference <= 60 - 1) {
        foundedUnitIndex = 0
    }
    if (absDifference >= 60 && absDifference <= 60 * 60 - 1) {
        foundedUnitIndex = 1
    }
    if (absDifference >= 60 * 60 && absDifference <= 3600 * 24 - 1) {
        foundedUnitIndex = 2
    }

    return rtf.format(
        Math.ceil(difference / segments[foundedUnitIndex]),
        units[foundedUnitIndex]
    )
}
