import Image from 'next/image';
import { api } from '../lib/axios';
import appPreviewImg from './../assets/app-nlw-copa-preview.png';
import checkIcon from './../assets/icon-check.svg';
import Logo from './../assets/logo.svg';
import usersImg from './../assets/users-avatar-example.png';

interface HomeProps {
  poolCount: number;
  guessesCount: number;
  usersCount: number;
}

export default function Home({ poolCount, guessesCount, usersCount }: HomeProps) {
  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={Logo} alt="Logo" />

        <h1 className='mt-14 text-white font-bold leading-tight text-5xl'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={usersImg} alt="" />
          <strong className='font-bold text-xl text-[#E1E1E6]'>
            <span className='text-[#129E57]'>+{usersCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form className='mt-10 flex gap-2'>
          <input className="text-white flex-1 py-4 px-6 rounded bg-[#202024] border border-[#323238] text-sm placeholder:text-[#C4C4CC] focus:outline-0 focus:border-[#129E57]" type='text' required placeholder='Qual nome do seu bolão?'/>
          <button className="rounded py-4 px-6 uppercase text-sm font-bold text-[#09090A] bg-[#F7DD43] hover:brightness-75 transition-all" type='submit'>Criar meu bolão</button>
        </form>

        <p className='mt-4 text-sm text-[#8D8D99] leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className='mt-10 pt-10 text-[#E1E1E6] border-t border-[#323238] flex items-center justify-between'>
          <div className='flex items-center gap-6 w-fit'>
            <Image src={checkIcon} alt=""/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='bg-[#323238] w-px h-12'/>

          <div className='flex items-center gap-6 w-fit'>
            <Image src={checkIcon} alt=""/>
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{guessesCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImg} alt="Dois celulares exibindo uma prévia da aplicação móvel." />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessesCountResponse, usersCountResponse] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count')
  ])
  
  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    },
  }
}
