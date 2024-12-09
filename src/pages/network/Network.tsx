import { FormEvent, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";

import { db } from '../../services/firebaseConnection';
import {
  setDoc,
  doc,
  getDoc
} from 'firebase/firestore';


const Network = () => {

  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');

  useEffect(() => {
    function loadLinks(){
      const docRef = doc(db, "social", "link")
      getDoc(docRef)
      .then((snapshot) => {
        if(snapshot.data() !== undefined){
          setGithub(snapshot.data()?.github)
          setLinkedin(snapshot.data()?.linkedin)
        }
      })
    }

    loadLinks()

  }, [])





  function handleRegister(e: FormEvent){
    e.preventDefault();

    setDoc(doc(db, "social", "link"),{
      github: github,
      linkedin: linkedin
    })
    .then(() => {
      console.log('Salvo com sucesso!')
    })
    .catch((error) => {
      console.log(`Erro ao Salvar ${error}`);
    })
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
        <Header/>

        <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas Redes Sociais</h1>

        <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
          <label className="text-white font-medium mt-2 mb-2">Github</label>
          <Input
            type="URL"
            placeholder="Digite a URL do Github"
            value={github}
            onChange={(e) => setGithub (e.target.value)}
          />

          <label className="text-white font-medium mt-2 mb-2">Linkedin</label>
            <Input
              type="URL"
              placeholder="Digite a URL do Linkedin"
              value={linkedin}
              onChange={(e) => setLinkedin (e.target.value)}
          />

          <button 
            type="submit"
            className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7"            
            >
              Salvar Links
          </button>


        </form>
    </div>
  )
}

export default Network