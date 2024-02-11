//load phones :
const loadPhones = async (searchText = '13', isShowA ll) => {
  
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    displayPhones(data.data )
  
}




//display phones function
const displayPhones = (phones) => {
 
    const showAllBtn = document.getElementById('showAll')
    const displayPhn = document.getElementById('displayPhn');
    displayPhn.innerHTML = ''


    if (phones.length > 12) {
        showAllBtn.classList.remove('hidden')
    }
    else {
        showAllBtn.classList.add('hidden')
    }

    
    phones = phones.slice(0, 12)




    phones.forEach(phone => {
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card w-80 bg-base-200  mt-2'
        phoneCard.innerHTML =
            `
                <figure class="px-10 pt-10">
                    <img src="${phone.image}" alt="phones"  />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <div class="card-actions">
                        <button class="btn btn-primary">Details Info</button>
                    </div>
                </div>

    `
        displayPhn.appendChild(phoneCard)

    });
}

//get input  value when click button

const getInputValue = () => {
    const targetInput = document.getElementById('inputValue')
    const searchText = targetInput.value;
    loadPhones(searchText)
    targetInput.value = ''

}

//shaowAllPhones function :
const shaowAllPhones = (isShowAll) => {
    
}

//call loadPhones function :
loadPhones()