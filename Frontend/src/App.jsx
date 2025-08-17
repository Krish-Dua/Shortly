import { useState } from 'react'
import './App.css'
import { TailSpin } from "react-loader-spinner"

function App() {
  const [inputUrl, setinputUrl] = useState("")
  const [outputUrl, setoutputUrl] = useState("")
  const [message, setmessage] = useState("")
  const [isDisabled, setisDisabled] = useState(false)
  const [copied, setCopied] = useState(false) // ✅ new state for copy confirmation

  const handleClick = async () => {
    if (!inputUrl) {
      setoutputUrl("")
      setmessage("Please enter a URL");
      return;
    }
    setisDisabled(true)
    let res = await fetch("http://localhost:3000/api/CreateShortUrl", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ originalUrl: inputUrl })
    })
    let data = await res.json()
    if (data.sucess) {
      setoutputUrl(data.shortUrl)
      setmessage("")
    }
    else {
      setmessage(data.message)
      setoutputUrl("")
    }
    console.log(data)
    setisDisabled(false)
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputUrl)
    setCopied(true)

    setTimeout(() => setCopied(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col">
      <header className="w-full py-6 sm:py-8 bg-white p-4 shadow-sm">
        <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 tracking-tight mb-2">Shortly</h1>
          <p className="text-base sm:text-lg text-blue-900 max-w-xl font-medium">
            Tired of sharing long, messy links? Simplify your links with shortly. Paste your long URL below and get a short, shareable link instantly.
          </p>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 mt-10 flex flex-col gap-6">
          <input
            className="text-base sm:text-lg p-3 rounded-lg border border-blue-200 focus:border-blue-500 outline-none transition w-full bg-blue-50 placeholder-blue-300"
            type="text"
            required
            placeholder="Paste your long URL here..."
            value={inputUrl}
            onChange={(e) => setinputUrl(e.target.value)}
          />
          {message && (
            <p className="text-red-500 text-sm sm:text-base font-semibold text-center">{message}</p>
          )}
          <button
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 px-6 sm:px-8 rounded-lg text-base sm:text-lg shadow w-full flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isDisabled}
            onClick={handleClick}
          >
            {isDisabled ? (
              <TailSpin
                visible={true}
                height="22"
                width="22"
                color="#ffffff"
                ariaLabel="tail-spin-loading"
                radius="3"
              />
            ) : (
              'Shorten URL'
            )}
          </button>
          {outputUrl && (
            <div className="mt-6 flex flex-col items-center gap-3 animate-fade-in">
              <h2 className="text-blue-700 text-xl sm:text-2xl font-bold mb-1">Your Shortened URL</h2>
              <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
                <input
                  className="text-center text-base sm:text-lg bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 w-full font-mono text-blue-900 select-all cursor-pointer"
                  value={outputUrl}
                  readOnly
                  onClick={e => e.target.select()}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 transition text-white rounded-lg px-4 py-2 font-semibold shadow w-full sm:w-auto"
                  onClick={handleCopy}
                >
                  {copied ? "✅" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="w-full py-4 sm:py-6 mt-auto text-center text-blue-400 text-xs sm:text-sm">
        &copy; {new Date().getFullYear()} Shortly. All rights reserved.
      </footer>
    </div>
  )
}

export default App
