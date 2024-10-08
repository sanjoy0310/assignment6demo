// DOM Elements
const petListings = document.querySelector('.pet-listings');
const categoriesDiv = document.getElementById('categories');
const petsList = document.getElementById('pets-list');
const sortPriceButton = document.getElementById('sort-price');

// Fetch All Pets
async function fetchAllPets() {
  try {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    displayPets(data.pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
  }
}

// Display Pets
function displayPets(pets) {
  petsList.innerHTML = '';
  pets.forEach(pet => {
    const petCard = `
      <div class="pet-card bg-white shadow-md rounded-lg p-4">
        <img src="${pet.image}" alt="${pet.name}" class="w-full h-32 object-cover rounded-md mb-4">
        <h3 class="text-lg font-bold text-gray-800">${pet.name}</h3>
        <p class="text-gray-600">${pet.age} years old</p>
        <button onclick="fetchPetDetails(${pet.id})" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">View Details</button>
      </div>
    `;
    petsList.innerHTML += petCard;
  });
}

// Fetch Pet Details by ID
async function fetchPetDetails(petId) {
  try {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    const data = await response.json();
    displayPetDetails(data.pet);
  } catch (error) {
    console.error("Error fetching pet details:", error);
  }
}

// Display Pet Details (Modal or Details Page)
function displayPetDetails(pet) {
  alert(`Name: ${pet.name}\nAge: ${pet.age}\nVaccination History: ${pet.vaccinationHistory}`);
}

// Fetch All Pet Categories
async function fetchCategories() {
  try {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await response.json();
    displayCategories(data.categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Display Categories
function displayCategories(categories) {
  categoriesDiv.innerHTML = '';
  categories.forEach(category => {
    const categoryButton = `
      <button onclick="fetchPetsByCategory('${category.name}')" class="category-button bg-gray-200 text-gray-800 px-4 py-2 rounded-full">${category.name}</button>
    `;
    categoriesDiv.innerHTML += categoryButton;
  });
}

// Fetch Pets by Category
async function fetchPetsByCategory(categoryName) {
  try {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`);
    const data = await response.json();
    displayPets(data.pets);
  } catch (error) {
    console.error(`Error fetching pets in category ${categoryName}:`, error);
  }
}

// Sort Pets by Price
sortPriceButton.addEventListener('click', () => {
  const pets = Array.from(petsList.children);
  pets.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('.pet-price').innerText.replace('$', ''));
    const priceB = parseFloat(b.querySelector('.pet-price').innerText.replace('$', ''));
    return priceA - priceB;
  });
  pets.forEach(pet => petsList.appendChild(pet));
});

// Initial Load
fetchAllPets();
fetchCategories();
