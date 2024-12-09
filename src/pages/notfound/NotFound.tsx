import { Link } from 'react-router-dom';
import Error from '../../imgs/Hands - Folder Error.png';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen w-full text-white font-medium">
        <img src={Error} alt="Imagem de Erro" />
        <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6'>Opss... Parece que essa página não existe!</p>
        
        <Link to='/' className='bg-gray-50/20 py-1 px-4 rounded-md'>
            Home
        </Link>
        
    </div>
  )
}

export default NotFound