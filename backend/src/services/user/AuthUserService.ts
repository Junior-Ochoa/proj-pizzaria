
import prismaCliente from "../../prisma";
import { compare } from 'bcryptjs'

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({ email, password }: AuthRequest){
        // verificar se o email existe.
        const user = await prismaCliente.user.findFirst({
            where:{
                email: email
            }
        })
        
        if(!user){
            throw new Error("User/password incorrect")
        }

        // verificar se a senha que o usuario mandou esta correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("User/password incorrect") 
        }

        // gerar um token JWT e devolver os dados do usuario como id, name e email
        





      return { ok: true }  
    }
}

export { AuthUserService };