export class ValidationErrorStandart extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

export class PropertyRequiredError extends ValidationErrorStandart {
    constructor(property) {
        super("not property: " + property);
        this.name = "PropertyRequiredError";
        this.property = property;
    }
}

