const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];

  const imcTable=document.querySelector('#imc-table')

  const heightInput=document.querySelector("#AlturaCorporal")
  const weightInput=document.querySelector("#PescoCorporal")
  const clearBtn=document.querySelector("#clear")
  const calcBtn=document.querySelector("#calc")


  const calcContainer=document.querySelector("#envio")
  
  const resultContainer=document.querySelector("#resultado")


  const imcNumber=document.querySelector("#imcNumber span")
  const imcinfo=document.querySelector("#imc-info span")
  const backBtn=document.querySelector(".back")



  function createTable(data){
    data.forEach((item)=>{
        const div = document.createElement('div')
        div.classList.add("table-data")

        const classification=document.createElement('p')
        classification.innerHTML=item.classification

        const info=document.createElement('p')
        info.innerHTML=item.info

        const obesity=document.createElement('p')
        obesity.innerHTML=item.obesity

        div.appendChild(classification)
        div.appendChild(info)
        div.appendChild(obesity)

        imcTable.appendChild(div)
    })

  }

  function clearInputs(){
    heightInput.value=""
    weightInput.value=""
  }

  function calcImc(weight,height){
    const imc=weight/(height*height).toFixed(1)
    return imc
}



function validDigit(text){
    return text.replace(/[^0-9,]/g,"")
}


function showOrHeight(){
   calcContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")

}

  createTable(data)

    heightInput.addEventListener('input',(e)=>{
        const update=validDigit(e.target.value)
        e.target.value=update
    })

    weightInput.addEventListener('input',(e)=>{
        const update=validDigit(e.target.value)
        e.target.value=update
    })
 
calcBtn.addEventListener("click",e=>{
    e.preventDefault()
    const weight=+weightInput.value.replace(",",".")
    const height=+heightInput.value.replace(",",".")


    if(!weight  || !height)return

    const imc=calcImc(weight,height)

    let info
    data.forEach((item)=>{
        if(imc>=item.min && imc <=item.max){
            info=item.info
        }
        

       

        imcNumber.innerText= imc
        imcinfo.innerText=info

        switch(info){
            case "Magreza":
                imcNumber.classList.add("low");
            imcinfo.classList.add("low");
        break

        case "Normal":
                imcNumber.classList.add("good");
            imcinfo.classList.add("good");
        break

        case "Sobrepeso":
                imcNumber.classList.add("low");
            imcinfo.classList.add("low");
        break

        case "Obsidade grave":
                imcNumber.classList.add("high");
            imcinfo.classList.add("high");
        break
        }




        showOrHeight()
    })
})



backBtn.addEventListener("click",()=>{
    clearInputs()
    showOrHeight()
})


