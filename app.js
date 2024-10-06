// API Endpoints
const apiBase = 'https://openapi.programming-hero.com/api/peddy';
const categoriesEndpoint = `${apiBase}/categories`;
const petsEndpoint = `${apiBase}/pets`;

// DOM Elements
const categoriesContainer = document.getElementById('categories');
const petsList = document.getElementById('pets-list');
const petModal = document.getElementById('pet-modal');
const petName = document.getElementById('pet-name');
const petDetails = document.getElementById('pet-details');
const closeModal = document.getElementById('close-modal');
let allPets = [];

// Fetch Categories
async function fetchCategories() {
  const response = await fetch(categoriesEndpoint);
  const data = await response.json();
  const categories = data.data;
  displayCategories(categories);
}

// Display Categories
function displayCategories(categories) {
  categories.forEach(category => {
    const button = document.createElement('button');
    button.classList.add('bg-gray-200', 'px-4', 'py-2', 'rounded-full');
    button.innerText = category.name;
    button.addEventListener('click', () => fetchPetsByCategory(category.name));
    categoriesContainer.appendChild(button);
  });
}

// Fetch All Pets
async function fetchAllPets() {
  const response = await fetch(petsEndpoint);
  const data = await response.json();
  allPets = data.data;
  displayPets(allPets);
}

// Fetch Pets by Category
async function fetchPetsByCategory(category) {
  const response = await fetch(`${apiBase}/category/${category}`);
  const data = await response.json();
  const pets = data.data;
  displayPets(pets);
}

// Display Pets
function displayPets(pets) {
  petsList.innerHTML = '';
  if (pets.length === 0) {
    petsList.innerHTML = '<p class="text-center text-gray-600">No pets available in this category.</p>';
    return;
  }
  pets.forEach(pet => {
    const petCard = document.createElement('div');
    petCard.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md');
    petCard.innerHTML = `
      <img src="${pet.image || 'placeholder.jpg'}" alt="${pet.name}" class="h-40 w-full object-cover rounded-md">
      <h3 class="mt-2 text-lg font-bold">${pet.name || 'Unknown'}</h3>
      <p class="text-gray-600">Breed: ${pet.breed || 'Unknown'}</p>
      <p class="text-gray-600">Price: $${pet.price || '0'}</p>
      <button class="bg-blue-500 text-white px-4 py-2 rounded-full mt-4">Details</button>
    `;
    const detailsButton = petCard.querySelector('button');
    detailsButton.addEventListener('click', () => showPetDetails(pet));
    petsList.appendChild(petCard);
  });
}

// Show Pet Details in Modal
function showPetDetails(pet) {
  petName.innerText = pet.name;
  petDetails.innerText = `Breed: ${pet.breed || 'Unknown'}\nPrice: $${pet.price || '0'}\nDescription: ${pet.description || 'No description available.'}`;
  petModal.classList.remove('hidden');
}

// Close Modal
closeModal.addEventListener('click', () => {
  petModal.classList.add('hidden');
});

// Initialize
fetchCategories();
fetchAllPets();
