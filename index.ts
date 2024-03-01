type MyArray<T> = T[]

const foo = (): MyArray<string | number> => {
return ['Ivan', 30]
}