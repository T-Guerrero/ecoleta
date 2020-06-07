/*------------------------------------/
 Preenchendo os campos Estado e Cidade
/------------------------------------*/

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json() })
    .then ( (states) => { 
        for(state of states)
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    })
}

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value //Id

    /*
    Além de setar o "uf" com o ID, setamos um input chamado "state"(l 49)
    logo, precisamos populá-lo com o nome do target
    */
    stateInput.value = event.target.options[event.target.selectedIndex].text

    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
    citySelect.setAttribute("disabled", true)
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
    .then( res => res.json() )
    .then( (cities) => {
        for (city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.getAttribute
        citySelect.removeAttribute("disabled")
    })
}

populateUFs()
document.querySelector("select[name=uf]").addEventListener("change", getCities)

/*------------------------------------/
   Selecionando os itens de coleta
/------------------------------------*/

function handleSelectedItem(event){
    const item = event.target
    const itemId = item.dataset.id
    item.classList.toggle("selected")
    
    //Retorna a posição se o elemento está no array
    const alreadySelected = selectedItems.findIndex( item => item == itemId)

    if (alreadySelected >= 0){
        //Está selecionado, ou seja, está no array
        const filtredItems = selectedItems.filter( item => item != itemId)
        //Filtra todos os elementos do array removendo o item
        selectedItems = filtredItems
    }
    else
        //Não está selecionado, ou seja, não está no array
        selectedItems.push(itemId)
    
    itemsInput.value = selectedItems
}

const itemsToCollect = document.querySelectorAll(".items-grid li")
const itemsInput = document.querySelector("input[name=items]")
let selectedItems = []

for (item of itemsToCollect)
    item.addEventListener("click", handleSelectedItem)