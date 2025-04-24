export class ValidationErrorStandart extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

export class PropertyRequiredError extends ValidationErrorStandart {
    constructor(property) {
        super(`\x1b[31m ${property} \x1b[0m`);
        this.name = "PropertyRequiredError";
        this.property = property;
    }
}
