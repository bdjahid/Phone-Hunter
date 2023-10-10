const loadPhone = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones)
}

const displayPhone = phones => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card card-compact p-4 bg-gray-300 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
        `;
        phoneContainer.appendChild(phoneCard);
    });
}

// handle search button
const handleSearch = () => {
    // console.log('click')
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    console.log(inputValue)
}

loadPhone()