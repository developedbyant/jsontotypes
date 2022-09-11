export declare const nonObjectTypes: (string | boolean | DateConstructor | null | undefined)[];
declare const _default: {
    getType(data: any, useBol?: boolean): "false" | "null" | "number" | "true" | "Date" | "undefined" | "boolean" | "string" | "list" | "object";
    listToInterface(items: any): string;
    saveType(newData: string, typeName: string, typePath: string): void;
    onlyObject(items: any[]): boolean;
    num2Spaces(num: number): string;
    capitalize(data: string): string;
    isANumber(data: string): boolean;
};
export default _default;
