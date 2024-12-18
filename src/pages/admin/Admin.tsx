import { useState, FormEvent, useEffect} from 'react';
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";

import { FaTrash } from "react-icons/fa";
import { db } from '../../services/firebaseConnection'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from 'firebase/firestore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}


const Admin = () => {

  const [nameInput, setNameInput] = useState('');
  const [nameUrl, setNameUrl] = useState('');
  const [colorInput, setColor] = useState('#FFFFFF');
  const [backgroundColor, setBackgroundColor] = useState('#000000');

  const [links, setLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })

      setLinks(lista);
      
    })

    return() => {
      unsub();
    }

  }, [])

  function handleCadastrar(e: FormEvent) {
    e.preventDefault();

    if (nameInput === '' || nameUrl === '') {
      toast.error('Preencha todos os campos!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      return;
    }

    addDoc(collection(db, "links"), {
      name: nameInput,
      url: nameUrl,
      bg: backgroundColor,
      color: colorInput,
      created: new Date()
    })
    .then(() => {
      setNameInput('');
      setNameUrl('');
      toast.success('Link cadastrado com sucesso!', {
        position: 'top-right',
        autoClose: 3000,
      });
      // console.log("CADASTRADO COM SUCESSO!");
    })
    .catch((error) => {
      toast.error(`Erro ao cadastrar: ${error}`, {
        position: 'top-right',
        autoClose: 3000,
      });
      // console.log(`ERRO AO CADASTRAR NO BANCO! ${error}`);
    })
  }

  async function handleDelete(id: string){
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }


  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
        <Header/>

        <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleCadastrar}>
          <label className="text-white font-medium mt-2 mb-2">Nome do Link <span className='text-red-600'>*</span></label>
            <Input
              placeholder="Digite o nome do link"
              value={nameInput}
              onChange={(e) => setNameInput (e.target.value)}
          />

          <label className="text-white font-medium mt-2 mb-2">URL do Link <span className='text-red-600'>*</span></label>
            <Input
              type='url'
              placeholder="Digite a URL do link"
              value={nameUrl}
              onChange={(e) => setNameUrl (e.target.value)}
          />

          <section className='flex my-4 gap-5'>
            <div className='flex gap-2'>
              <label className="text-white font-medium mt-2 mb-2">Cor do link</label>
              <input 
                type="color" 
                value={colorInput}
                onChange={(e) => setColor (e.target.value)}
              />
            </div>

            <div className='flex gap-2'>
              <label className="text-white font-medium mt-2 mb-2">Fundo do link</label>
              <input 
                type="color" 
                value={backgroundColor}
                onChange={(e) => setBackgroundColor (e.target.value)}
              />
            </div>
          </section>

          {nameInput !== '' && (
            <div className='flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md'>
              <label className="text-white font-medium mt-2 mb-3">Preview</label>
              <article 
                className='w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3'
                style={{marginBottom: 8, marginTop:8, backgroundColor: backgroundColor}}
                >
                <p className='font-medium' style={{color: colorInput}}>
                  {nameInput}
                </p>
              </article>
            </div>
          )}

          <button type='submit' className='bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center mb-7'>
            Cadastrar
          </button>
        </form>

        <h2 className='font-bold text-white mb-4 text-2xl'>
          Meus Links
        </h2>

        {links.map((link) => (
          <article 
            key={link.id}
            className='flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none' 
            style={{backgroundColor: link.bg , color: link.color}}>
            <p>{link.name}</p>
            <div>
              <button className='flex items-center' onClick={() => handleDelete(link.id)}>
                <FaTrash size={18} color='#FFF'/>
              </button>
            </div>
          </article>
        ))}

        <ToastContainer />
    </div>
  )
}

export default Admin