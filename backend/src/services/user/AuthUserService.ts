
import prismaCliente from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

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

        // se deu tudo certo, gerar o token para o usuario
        const token = sign(
            {
             name: user.name,
             email: user.email   
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )


      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
      }  
    }
}

export { AuthUserService };