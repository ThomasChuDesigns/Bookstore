export class Book {
    user: string;
    email: string;
    constructor(public slug: string = '', public name: string, public courses: Course[],
                public images: string[], public description: string, public price: number) {}
}

export class Course {
    constructor(public name: string, public id: number) {}
}