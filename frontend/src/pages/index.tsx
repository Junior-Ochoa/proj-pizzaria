import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';

import {Input} from '../components/ui/Input'
import {Button} from '../components/ui/Button'

import logoImg from '../../public/logo.svg';

import Link from 'next/link';

export default function Home() {
  return (
      <>
       <Head>
        <title>Pizzaria - Faça seu login </title>
       </Head>
       <div className={styles.containerCenter}>
          <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>

          <div className={styles.login}>
            <form>
                <Input
                placeholder='Digite seu email'
                type="text"
                />

                <Input
                placeholder='Digite sua senha'
                type="password"
                />

                <Button
                  type="submit"
                  loading={false}
                  >   
                    Acessar
                  </Button>
            </form>
            
              <Link className={styles.text} href="/signup" >Nao possui uma conta? Cadastre-se</Link>
          </div>
       </div>
      </>
  )
}
