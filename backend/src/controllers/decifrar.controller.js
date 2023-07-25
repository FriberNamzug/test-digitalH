export default async function decifrar(req, res) {
    try {
        const { texto_cifrado } = req.body;

        if (!texto_cifrado) return res.status(400).json({ message: "No se recibio el texto cifrado" })
        if (!texto_cifrado.includes("0")) return res.status(400).json({ message: "El texto cifrado no tiene el formato correcto" })

        const partes = texto_cifrado.split('0').filter(Boolean)
        if (partes.length != 3) return res.status(400).json({ message: "Texto con cifrado incorrecto" })


        console.log(partes)

        const texto_decifrado = {
            first_name: partes[0],
            last_name: partes[1],
            id: partes[2]
        }


        res.status(200).json({
            message: "Texto decifrado correctamente",
            data: {
                texto_decifrado,
                texto_cifrado
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error en el servidor", error })
    }
}

