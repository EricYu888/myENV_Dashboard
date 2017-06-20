export class User {
    private id: string;
    private name: string;
    constructor(public nameStr: string, public avatarSrc: string) {
        this.name = nameStr;
    }
}
