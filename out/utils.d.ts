declare const _default: {
    getType(data: any): "string" | "Date" | "null" | "undefined" | "boolean" | "number" | "list" | "object";
    includesObjects(items: any[]): boolean;
    includesOnlyObjects(items: any[]): boolean;
    getListTypesNoObject(items: any[]): string;
    num2Spaces(num: number): string;
    capitalize(data: string): string;
    isANumber(data: string): boolean;
    saveType(interfaceData: string, typeName: string, typePath: string): void;
};
export default _default;
