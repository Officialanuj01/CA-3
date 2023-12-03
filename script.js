// calling all the ids and classes that are needed to  build it

const searchResult = document.getElementById("searchResult")
const searchCategoryButton = document.getElementById("searchCategoryButton")
const searchBar = document.getElementById("searchBar")
const ingredients = document.getElementById("ingredients")
const randomFood = document.getElementById("randomFood")
const model = document.getElementById("model")
const foodNameImgContainer = document.getElementById("foodNameImgContainer")
const ingredientListContainer = document.getElementById("ingredientList");

// Here we are calling the api tofetch data for the random meal.
// it gives us a random meal with some properties like dish name,  ingredients, and img source.
// We are also creating the struture for the UI part of the random meal

fetch("https://www.themealdb.com/api/json/v1/1/random.php")
.then((data)=>{
    return data.json()
})
.then((dailyMeal)=>{
    console.log(dailyMeal.meals)
    const foodImage = document.createElement("img")
    foodImage.setAttribute("class","foodImage")
    foodImage.setAttribute("alt", "random")
    foodImage.src = dailyMeal.meals[0].strMealThumb

    const foodName = document.createElement("h1")
    foodName.setAttribute("class","foodName")
    foodName.innerHTML = dailyMeal.meals[0].strMeal


    ingredientListContainer.innerHTML = "";
    const ingredientList = document.createElement("ul");
    ingredientList.setAttribute("class", "ingredients-list");

    for (let i = 1; i <= 15; i++) {

        const ingredient = dailyMeal.meals[0][`strIngredient${i}`];
        const measure = dailyMeal.meals[0][`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
            const listItem = document.createElement("li");
            listItem.textContent = `${ingredient} - ${measure}`;
            ingredientList.appendChild(listItem);

            }
                else {
                    break; 
            }
        }

    randomFood.append(foodImage)
    randomFood.append(foodName)
    ingredientListContainer.appendChild(ingredientList);

    foodNameImgContainer.append(randomFood)

})

// Here we are calling the api and fetching the data for the category section.
// We are also creating the struture of UI part for category section 
// we are also catching the error in the case user search for unavailble category

searchCategoryButton.addEventListener("click",()=>{
    const categoryName =  searchBar.value

    searchResult.innerHTML=""
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then((data)=>{
        return data.json()
    })
    .then((mealData)=>{
        console.log(mealData.meals)
        mealData.meals.forEach((meal)=>{

            const categoryFoodImage = document.createElement("img")
            categoryFoodImage.setAttribute("class", "categoryFoodImage")
            categoryFoodImage.setAttribute("alt" , "food image")
            categoryFoodImage.src = meal.strMealThumb

            const categoryFoodName = document.createElement("h3")
            categoryFoodName.setAttribute("class","categoryFoodName")
            categoryFoodName.innerText = meal.strMeal

            const foodContainer = document.createElement("div"); 
            foodContainer.setAttribute("class",'foodImgAndName')
            foodContainer.appendChild(categoryFoodImage);
            foodContainer.appendChild(categoryFoodName);

            searchResult.append(foodContainer)
        })
        searchBar.value = ''

    })
    .catch(()=>{
        alert(`Sorry We don't have this category Please enter a valid category`)


    })


    
})

// here we are creating the  model for  the ingredients part so in this we have created 2 functions openModel, closeModal,and
// after that we have attach an EventListener.

function openModal() {
    document.getElementById('model1').style.display='block';
}

function closeModal() {
    document.getElementById('model1').style.display='none';
}

const ingredientsModel = document.getElementById('model1');
randomFood.addEventListener("click", () => {
    openModal();
});




