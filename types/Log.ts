export type Log = {
    date: Date,
    data: LogData,
    issues: Issue[],
    sum: number
}

export type Issue = {
    id:number,
    title: string,
    description: string,
    tags: string
}

export type LogData = {
    discharge: {
        compounding: number,
        yellowCards: number,
        blisterPacks: number,
        paediatric: number,
        other: number,
        sum: number
    },
    outp: {
        eylea: number,
        bicillin: number,
        ferinject: number,
        binocrit: number,
        aclasta: number,
        compounding: number,
        yellowCards: number,
        blisterPacks: number,
        paediatric: number,
        other: number,
        sum: number
    },
    gp: {
        compounding: number,
        yellowCards: number,
        blisterPacks: number,
        paediatric: number,
        other: number,
        sum: number
    },
    ed: {
        compounding: number,
        yellowCards: number,
        blisterPacks: number,
        paediatric: number,
        other: number,
        sum: number
    }
}