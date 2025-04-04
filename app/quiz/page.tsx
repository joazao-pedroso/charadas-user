'use client'
import { motion } from "framer-motion";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

type Charada = {
    pergunta: string
    resposta: string
    id: number
}


export default function Quiz(){
    const [flippedStates, setFlippedStates] = useState<{ [key: number]: boolean }>({})
    const [charada, setCharada] = useState<Charada>({pergunta: '',resposta: '', id: 0})
    const [tentativas, setTentavias] = useState(3)
    const [use_response, setUser_response] = useState('')
    const [rigth, setRigth] = useState(false)
    async function handleGetRandomCharade() {
        let response = await fetch('https://backend-charadas.vercel.app/charadas/random')
        let data = await response.json()
        setTentavias(3)
        setCharada(data)
        setRigth(false)
    }

    useEffect(() => {
        handleGetRandomCharade()
    }, [])
    const toggleFlip = (id: number) => {
        setFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }))
    };

    const handleValidateCharadae = () => {
        if (use_response != charada.resposta){
            setTentavias(tentativas - 1)
        }
        else{
            setRigth(true)
        }
    }

    return (
        <div className="mt-5 mx-10">
          <a href="/create" className="cursor-pointer">
            <h1 className="text-4xl font-bold font-serif">JP Charadas</h1>
          </a>
          <p className="text-4xl mt-5 text-center font-serif text-muted-foreground">Acerte a charada!?</p>
      
          <div className="container mx-auto py-10 px-4 flex mt-10 rounded-xl border-2 justify-center items-center">
            <div className="perspective-1000">
              <motion.div
                className="relative w-60 h-80"
                animate={{ rotateY: flippedStates[charada.id] ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={`absolute w-full h-full p-4 flex flex-col justify-between items-center border rounded-2xl shadow-lg bg-card ${
                    flippedStates[charada.id] ? "hidden" : "block"
                  }`}
                >
                  <div className="text-center">
                    <p className="text-xl font-semibold">Pergunta:</p>
                    <p className="text-muted-foreground italic font-serif text-xl my-3">
                      "{charada.pergunta}"
                    </p>
                    <p className="text-green-500">{rigth == true ? 'PARABENS!'  : ''}</p>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    {tentativas <= 0 ? <Button variant="outline" className="w-full" onClick={() => toggleFlip(charada.id)}>Revelar Charada</Button> : <Button disabled variant="outline" className="w-full" >Tentativa: {tentativas}</Button>}
                  </div>
                </div>
                <div
                  className={`absolute w-full h-full p-4 flex flex-col justify-between items-center border rounded-2xl shadow-lg bg-card rotate-y-180 ${
                    flippedStates[charada.id] ? "block" : "hidden"
                  }`}
                >
                  <div className="text-center">
                    <p className="text-xl font-semibold">Resposta:</p>
                    <p className="text-muted-foreground italic font-serif text-xl my-3">
                    {tentativas <= 0 ? `"${charada.resposta}"` : '???'}  
                    </p>
                    <p className="text-green-500">{rigth == true ? 'PARABENS!'  : ''}</p>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <Button variant="outline" className="w-full" onClick={() => toggleFlip(charada.id)}>
                      Voltar
                    </Button>
                  </div>
                </div>
              </motion.div>
              <input onChange={(e) => setUser_response(e.target.value)} type="text" className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full mt-5 text-center  min-w-0 rounded-md border bg-card px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-card file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:!shadow-destructive" placeholder="Digite a resposta..." />
              <div className=" mt-5 items-center justify-around buttons w-full flex flex-row gap-2">
                <Button  className="w-[45%]" onClick={handleValidateCharadae}>Validar</Button>
                <Button className="w-[45%]" onClick={handleGetRandomCharade} variant='destructive'>Nova Charada</Button>
              </div>
            </div>
          </div>
        </div>
      )     
}