export function filter<TItem>(array: Array<TItem>, predicate: (item: TItem, index: number) => Boolean): Array<TItem> {
    var res: Array<TItem> = []
    for (let i = 0; i < array.length; ++i) {
        if (predicate(array[i], i)) {
            res.push(array[i]);
        }
    }
    return res;
}