"use client";

import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";


interface CharadaForm {
  pergunta: string
  resposta: string
}

export default function CreateCharade() {
  const { register, handleSubmit } = useForm<CharadaForm>()
  const router = useRouter() 

  async function handleSubmitForm(formData: CharadaForm) {
    const dataWithId = { ...formData, id: uuidv4() }

    try {
      const response = await fetch("http://127.0.0.1:5000/charadas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithId),
      });

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
        <h1 className="text-4xl font-bold font-serif ">JPcharadas</h1>
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
          <h1 className="font-bold font-serif text-3xl text-center">Nova charada:</h1>
          <p className="text-muted-foreground text-sm text-center">Crie charadas para o nosso quiz!</p>
          <form onSubmit={handleSubmit(handleSubmitForm)} >
            <div className="inputs gap-5 w-full h-70 flex items-center justify-center flex-col">
              <input
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-[70%] min-w-0 rounded-md border bg-card px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-card file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:!shadow-destructive"
                {...register("pergunta")}
                name="pergunta"
                placeholder="Pergunta"
                required
              />
              <input
                className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-[70%] min-w-0 rounded-md border bg-card px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-card file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aria-invalid:!shadow-destructive"
                {...register("resposta")}
                placeholder="Resposta"
                required
              />
                  <Button className="w-[70%]" type="submit">Enviar Charada</Button>
              </div>
          </form>
          </div>
    </div>
  );
}
