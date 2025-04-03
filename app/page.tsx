"use client"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion";


type Charada = {
    id: number;
    pergunta: string;
    resposta: string;
};


export default function Home() {
    const router = useRouter();
    const [charadas, setCharadas] = useState<Charada[]>([]);
    const [flippedStates, setFlippedStates] = useState<{ [key: number]: boolean }>({})

    useEffect(() => {
        const fetchCharadas = async () => {
            const response = await fetch("http://127.0.0.1:5000/charadas")
            const data = await response.json()
            setCharadas(data)
        }

        fetchCharadas()
    }, [])

    const handleDeleteCharade = async (id: number) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/charadas/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Erro ao deletar: ${response.statusText}`)
            }
            console.log("Charada deletada com sucesso!")

            setCharadas(charadas.filter((charada) => charada.id !== id))

        } catch (error) {
            console.error("Erro ao excluir charada:", error)
        }
    };

    const toggleFlip = (id: number) => {
        setFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }))
    };

    return (
        <div className="mt-5 mx-10">
           <a href="/create" className="cursor-pointer"><h1 className="text-4xl font-bold font-serif">Charadas do JP</h1></a>
            <p className="text-2xl mt-5 text-center font-serif text-muted-foreground">Charadas criadas:</p>
            <div className="container mx-auto py-10 px-4 space-y-12 flex items-center justify-center">
                <div className="charadas items-center justify-center gap-5 border flex-wrap flex w-[95%] max-h-auto min-h-70 rounded-xl py-10 px-10">
                    {charadas.map((item: Charada) => (
                        <div key={item.id} className="perspective-1000">
                            <motion.div
                                className="relative w-60 h-80"
                                animate={{ rotateY: flippedStates[item.id] ? 180 : 0 }}
                                transition={{ duration: 0.6 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <div className={`absolute w-full h-full p-4 flex flex-col justify-between items-center border rounded-2xl shadow-lg bg-card ${flippedStates[item.id] ? "hidden" : "block"}`}>
                                <div className="text-center">
                                        <p className="text-xl font-semibold">Pergunta:</p>
                                        <p className="text-muted-foreground italic font-serif text-xl my-3">"{item.pergunta}"</p>
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <Button variant="outline" className="w-full" onClick={() => toggleFlip(item.id)}>Revelar Charada</Button>
                                        <div className="flex justify-between">
                                            <Button className="w-[48%]">Editar</Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                <Button variant="destructive" className="hover:bg-red-400 w-[45%]">
                                                    Excluir
                                                </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                    Deseja excluir essa charada?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteCharade(item.id)}>
                                                    Sim, excluir
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </div>
                                <div className={`absolute w-full h-full p-4 flex flex-col justify-between items-center border rounded-2xl shadow-lg bg-card rotate-y-180 ${flippedStates[item.id] ? "block" : "hidden"}`}>
                                    <div className="text-center">
                                        <p className="text-xl font-semibold">Resposta:</p>
                                        <p className="text-muted-foreground italic font-serif text-xl my-3">"{item.resposta}"</p>
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <Button variant="outline" className="w-full" onClick={() => toggleFlip(item.id)}>Voltar</Button>
                                        <div className="flex justify-between">
                                            <Button className="w-[48%]">Editar</Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                <Button variant="destructive" className="hover:bg-red-400 w-[45%]">
                                                    Excluir
                                                </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                    Deseja excluir essa charada?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteCharade(item.id)}>
                                                    Sim, excluir
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
