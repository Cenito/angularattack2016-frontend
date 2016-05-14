export function map<TItem, TResult>(array: Array<TItem>, fn: (item: TItem, index: number) => TResult): Array<TResult> {
    var res: Array<TResult> = []
    for (let i = 0; i < array.length; ++i) {
        res.push(fn(array[i], i));
    }
    return res;
}