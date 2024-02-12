//load phones :
const loadPhones = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    displayPhones(data.data, isShowAll)

}




//display phones function
const displayPhones = (phones, isShowAll) => {
    console.log(phones)
    const showAllBtn = document.getElementById('showAll')
    const displayPhn = document.getElementById('displayPhn');
    displayPhn.textContent = '';


    if (phones.length > 12 && !isShowAll) {
        showAllBtn.classList.remove('hidden')//btn dekhabe
    }
    else {
        showAllBtn.classList.add('hidden')
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }

    phones.forEach(phone => {
        console.log(phone)
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
                        <button  onclick="handdleShowModal('${phone.slug}')" class="btn btn-neutral">Details Phone</button>
                    </div>
                </div>

    `
        displayPhn.appendChild(phoneCard)
        spinner(false)
    });
}
//show modal details : handdleShowModal()
const handdleShowModal = async (id) => {
    console.log('clicked', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    disPlaModalPhoneInfo(data.data)

}

const disPlaModalPhoneInfo = displayPhoneInfo => {
  
    const brandName = document.getElementById('brand');
    brandName.innerText = displayPhoneInfo.brand

    const phoneName = document.getElementById('name');
    phoneName.innerText = displayPhoneInfo?.name

    const releaseDate = document.getElementById('releaseDate');
    releaseDate.innerText = displayPhoneInfo?.releaseDate || 'NO Data'


    const mainfecture = document.getElementById('mainFecture1');
    mainfecture.innerText = displayPhoneInfo.mainFeatures?.chipSet || 'No Data'

    const mainFecture1 = document.getElementById('mainFecture2');
    mainFecture1.innerText = displayPhoneInfo.mainFeatures?.displaySize || 'No Data'

    const mainfecture3 = document.getElementById('mainFecture3');
    mainfecture3.innerText = displayPhoneInfo.mainFeatures?.memory

    const image = document.getElementById('image');
    image.innerHTML = `
     <img  src="${displayPhoneInfo?.image}" alt="" srcset="">
     `

    //modal show id
    phoneDetailsModal.showModal()
}


//get input  value when click button

const getInputValue = (isShowAll) => {
    spinner(true)
    const targetInput = document.getElementById('inputValue')
    const searchText = targetInput.value;
    loadPhones(searchText, isShowAll)


}

//shaowAllPhones function :
const shaowAllPhones = () => {
    getInputValue(true)
}


//spinner function :
const spinner = (isLoading) => {
     const loader = document.getElementById('loader')
     if(isLoading){
        loader.classList.remove('hidden')
     }else{
        loader.classList.add('hidden')
     }
}

//call loadPhones function :
loadPhones()