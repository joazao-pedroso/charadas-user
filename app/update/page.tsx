'use client'
import  Link  from "next/link"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
type Charada = {
    id: number
    pergunta: string
    resposta: string
}

interface CharadaForm {
    pergunta: string
    resposta: string
  }

export default function Update() {
    const { register, handleSubmit } = useForm<CharadaForm>()
    const router = useRouter()
    const [charada, setCharada] = useState<Charada>({
        id: 0,
        pergunta: '',
        resposta: '',
    })
    const [pergunta, setPergunta] = useState('')
    const [resposta, setResposta] = useState('')
    
    const getcharada = useCallback(async (id: string) => {
        const response = await fetch(`https://backend-charadas.vercel.app/charadas/${id}`)
        console.log(id)
        if (!response.ok) {
            router.push('/')
            return
        }
        const data = await response.json()
        if (data) {
            setCharada(data)
            setPergunta(data.pergunta)
            setResposta(data.resposta)
        } else {
            router.push('/')
        }
    }, [router])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const id = urlParams.get('id')
        if (id) {
            getcharada(id)
        } else {
            router.push('/')
        }
    }, [getcharada])
      
        async function handleSubmitForm(formData: CharadaForm) {
      
          try {
            const response = await fetch(`https://backend-charadas.vercel.app/charadas/${charada.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
      
            const data_post = await response.json()
            console.log("Resposta do backend:", data_post)
            
            router.push("/") 
      
          } catch (error) {
            console.error("Erro ao enviar charada:", error)
            router.push("/") 
          }
        }
      
        return (
        <div className="container mx-auto py-10 px-4 space-y-12">
                <Link href="/" className="cursor-pointer">
                <h1 className="mb-10 text-4xl font-bold font-serif">Charadas do JP</h1>
                </Link>                <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                <h1 className="font-bold font-serif text-3xl text-center">Editar charada</h1>
                <p className="text-muted-foreground text-sm text-center">Crie charadas para o nosso quiz!</p>
                <form onSubmit={handleSubmit(handleSubmitForm)} >
                    <div className="inputs gap-5 w-full h-70 flex items-center justify-center flex-col">
                    <input
                        className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-[70%] min-w-0 rounded-md border bg-card px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-card file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:!shadow-destructive"
                        {...register("pergunta")}
                        name="pergunta"
                        placeholder="Pergunta"
                        value={pergunta}
                        onChange={(e) => setPergunta(e.target.value)}
                        required
                    />
                    <input
                        className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-[70%] min-w-0 rounded-md border bg-card px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-card file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:!shadow-destructive"
                        {...register("resposta")}
                        placeholder="Resposta"
                        value={resposta}
                        onChange={(e) => setResposta(e.target.value)}
                        required
                    />
                        <Button className="w-[70%]" type="submit">Editar Charada</Button>
                    </div>
                </form>
                </div>
            </div>
        );
}