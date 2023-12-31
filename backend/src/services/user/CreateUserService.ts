
import prismaCliente from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){
        
        // verificar se ele enviou um email 
        if(!email){
            throw new Error("Email incorreto")
        }

        // verificar se esse email já esta cadastrado
        const userAlreadyExists = await prismaCliente.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8)

        // cadastrar usuario no banco de dados
        const user = await prismaCliente.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true,   
            }
        })



        return user;
    }
}

export { CreateUserService }