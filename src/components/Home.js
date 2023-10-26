import React, { useState } from "react";
import Navbar from "./Navbar";
import parse from 'html-react-parser'
import './Home.css'
const { Configuration, OpenAIApi } = require("openai");

const Home = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [ingredientes, setIngredientes] = useState('')
    const [receita, setReceita] = useState('')
    const [clicked, setClicked] = useState(false)

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const getReceita = async (e) => {
        e.preventDefault()
        setClicked(true)
        if (isProcessing || ingredientes == '') return;
        setReceita("")
        setIsProcessing(true)
        //function here
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Apresente uma receita bem elaborada e existente de restaurante gourmet feita com ${ingredientes}, dentro de uma div com classe ingredientes crie um cabeçalho principal com o nome da receita e outro cabeçalho html com a palavra ingredientes e em seguida
            liste os ingredientes em uma html ul li, faça o mesmo com o modo de preparo.`,
            temperature: 0,
            max_tokens: 1000,
        });
        //after data from api
        // console.log(response.data.choices[0].text)
        setReceita(response.data.choices[0].text)
        setIsProcessing(false)
        setClicked(false)
    }

    return (
        <>
            <header>
                <Navbar />
            </header>
            <body style={{ paddingTop: "150px", height: "100%" }}>
                <div className="container">
                    <div>
                        <h1 className="text-center m-4">
                            Sem idéias para a próxima alimentação?
                        </h1>

                        <p className="text-center pt-5">
                            Dê-nos os ingredientes e deixe o <b>Masterchef</b> lhe ajudar a escolher uma refeição deliciosa!
                        </p>
                    </div>

                    <div className="m-4">
                        <form className="text-center">
                            <div>
                                <textarea className="shadow-none form-control w-75 mx-auto rounded textareaInput"
                                    placeholder="ex. 2 ovos, arroz ...." style={{ height: "100px" }}
                                    onChange={(e) => { setIngredientes(e.target.value) }}></textarea>
                            </div>
                            <button type="submit" className="btn vw-50 btn-lg text-center m-3 receitaButton" onClick={(e) => { getReceita(e) }}>
                                Ver receita
                            </button>
                            {clicked && ingredientes == '' ?
                                <div className="alert alert-danger" role="alert">
                                    Você deve introduzir os ingredientes!
                                </div> : <span></span>}
                        </form>

                        <div className="text-center">
                            <div class={`spinner-grow text-info ${!isProcessing ? "d-none" : ""}`} role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {parse(receita)}
                    </div>
                </div>
            </body>
        </>

    )
}

export default Home;