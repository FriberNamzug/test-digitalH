import { useState } from 'react'
import Footer from './components/Footer'
import Tippy from '@tippyjs/react';
import { useMutation } from 'react-query'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import DoneIcon from '@mui/icons-material/Done';
import LockResetIcon from '@mui/icons-material/LockReset';
import CloseIcon from '@mui/icons-material/Close';

function App() {

  const [text, setText] = useState('')
  const [alerta, setAlerta] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [resultado, setResultado] = useState(null)
  const [checkSuccess, setCheckSuccess] = useState(false)
  const [error, setError] = useState(true)



  const mutationDecifrar = useMutation((text) => axios.post(`${import.meta.env.VITE_URL_API}/descifrar`, { texto_cifrado: text }), {
    onSuccess: (data) => {
      console.log(data.data.data)
      setResultado(data.data.data.texto_descifrado)
      setError(false)
      setAlerta(true)
      setText('')
      setCheckSuccess(false)
      setMensaje(data.data.message)
    },
    onError: (error) => {
      setError(true)
      console.log(error.response.data)
      setMensaje(error.response.data.message)
      setAlerta(true)
    }
  })

  const handleAlertClose = () => {
    setAlerta(false)
    setError(false)
    setMensaje('')
  }

  const handleTextChange = (e) => {
    const textoInput = e.target.value;
    const regex = /^[a-zA-Z]+0+[a-zA-Z]+0+[1-9][0-9]*$/;
    if (regex.test(textoInput)) {
      console.log('Texto válido:', textoInput);
      setCheckSuccess(true)
    } else {
      console.log('Texto inválido');
      setCheckSuccess(false)
    }
    setText(textoInput)
  };

  return (
    <div className='background flex flex-col min-h-screen w-full'>
      <main className='container mx-auto flex-grow flex flex-col space-y-5 items-center justify-center'>


        {/* CARD DE TEXTO */}
        {
          !resultado &&
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-[600px] mx-2 p-2 duration-200">
            <div className="flex justify-between">
              <label
                className="text-2xl font-bold text-gray-700"
                htmlFor='text'>
                Insertar texto cifrado
              </label>

              <Tippy
                content={
                  <p className="text-gray-200 text-justify ">
                    Inserte el texto cifrado, este texto debe contener un nombre, un apellido y un id,
                    entre cada dato debe haber 0 (ceros) sin importar la cantidad de ceros que haya entre cada dato.
                  </p>
                }>
                <button>❓</button>
              </Tippy>
            </div>

            {/* INPUT */}
            <div className="relative mt-5">
              <input
                type="text"
                id="text"
                className={`pl-10 pr-11 py-4 text-2xl w-full rounded-lg focus:outline-none duration-500 ${checkSuccess ? 'focus:border-green-500 bg-green-100  border border-green-300 ' : 'focus:border-yellow-500  border border-gray-300 '}`}
                placeholder="NOMBRE000000APELLIDO000000ID"
                value={text}
                onChange={handleTextChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (checkSuccess) mutationDecifrar.mutate(text)
                    else {
                      setError(true)
                      setMensaje('El texto ingresado no es válido')
                      setAlerta(true)
                    }
                  }
                }}
              />
              {
                checkSuccess &&
                <div className="absolute top-0 right-5 h-full flex items-center justify-center">
                  <DoneIcon className={`h-full w-6 text-green-500`} />
                </div>
              }

              <div className="absolute top-0 left-2 h-full flex items-center justify-center">
                <LockResetIcon className={`h-full w-6 duration-1000 ${checkSuccess ? 'text-green-500' : ''}`} />
              </div>
            </div>

            {/* BOTON */}
            <button
              onClick={() => {
                mutationDecifrar.mutate(text)
              }}
              disabled={!checkSuccess}
              className={`mt-2 px-2 py-4 text-2xl w-full border border-gray-300 rounded-lg focus:outline-none duration-500 ${checkSuccess ? 'hover:bg-green-500 hover:text-white bg-green-300' : 'cursor-not-allowed'}`}
            >
              Cifrar
            </button>

            {/* LOADER */}

            {
              mutationDecifrar.isLoading &&
              <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                <CircularProgress color="inherit" />
              </div>
            }




          </div>
        }

        {/* CARD DE RESULTADO */}
        {
          resultado &&
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-[600px] p-2 duration-200 relative">
            <CloseIcon className="absolute top-2 right-2 cursor-pointer hover:text-red-600 duration-500" onClick={() => setResultado(null)} />
            <h2 className="text-2xl font-bold text-gray-700 text-center">Texto descifrado</h2>
            <p>ID: <span className="underline italic">{resultado.id}</span></p>
            <p>Firstname: <span className="underline italic">{resultado.first_name}</span></p>
            <p>Lastname: <span className="underline italic">{resultado.last_name}</span></p>
          </div>
        }

      </main>
      {/* ALERT */}

      <Snackbar
        open={alerta}
        onClose={handleAlertClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}>
          {mensaje}
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  )
}

export default App
