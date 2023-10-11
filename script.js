const loadPhone = async (inputValue, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones, isShowAll)
}

const displayPhone = (phones, isShowAll) => {
    // console.log(phones)

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllPhone = document.getElementById('show-all-phone')
    if (phones.length > 12 && !isShowAll) {
        showAllPhone.classList.remove('hidden')
    } else {
        showAllPhone.classList.add('hidden')
    }

    // display 12 phones
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }

    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card card-compact p-4 bg-gray-300 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center mt-4">
            <button onclick="btnShowAllModal('${phone.slug}')"  class="btn btn-primary">Show Details</button>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false)
}

// handle search button
const handleSearch = (isShowAll) => {
    // console.log('click')
    toggleLoadingSpinner(true)
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    console.log(inputValue)
    loadPhone(inputValue, isShowAll)
}
// spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingDots = document.getElementById('loading-dots')
    if (isLoading) {
        loadingDots.classList.remove('hidden')
    } else {
        loadingDots.classList.add('hidden')
    }
}

// btnShowAll

const btnShowAll = (isShowAll) => {
    console.log('click')
    handleSearch(true)
}

// btnShowAllModal

const btnShowAllModal = async (id) => {
    // console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json()
    const phone = data.data
    showPhoneDetailsModal(phone)
}
// show phone details Modal
const showPhoneDetailsModal = (phone) => {
    console.log(phone)
    const showPhoneTitle = document.getElementById('show-phone-title');
    showPhoneTitle.innerText = phone.name;
    const showDetailsContainer = document.getElementById("show-details-container");
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}"/>
    <p><span>Storage : </span>${phone?.mainFeatures?.storage}</p>
    <p><span>GPS : </span>${phone?.others?.GPS}</p>
    `;

    // show modal
    my_modal_phone.showModal()
}


loadPhone()