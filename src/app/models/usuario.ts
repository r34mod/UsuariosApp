export class Usuario{
    constructor(
        public id_super: number,
        public _id: number,
        public username: string,
        public firstname: string,
        public rol: string,
        public email: string,
        public password: string,
        public department: string
    ){
        /*
        this.id_super=id_super;
        this._id=_id;
        this.username=username;
        this.firstname=firstname;
        this.rol=rol;
        this.email=email;
        this.password=password;
        this.department=department;
        */
    }
}