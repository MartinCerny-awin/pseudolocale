interface Options {
    prepend: string;
    append: string;
    delimiter: string;
    startDelimiter: string;
    endDelimiter: string;
    extend: number;
    override?: string;
}
export default function str(str: string, opts?: Options): string;
export {};
