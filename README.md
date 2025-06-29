# 🍻 Brewery Finder

Search for breweries in cities across the U.S. using the [OpenBreweryDB API](https://www.openbrewerydb.org/). Users can input a city name, navigate through paginated results, and view brewery information.

## ✨ Features

- 🔍 **City-based Brewery Search**
- 📄 **Paginated Results (10 per page)**
- ⚠️ **Error Handling for Empty Input**
- 🚫 **"No Breweries Found" Message**
- ✅ **Input Validation**

## 🧠 How It Works

### 🔍 Search

- Users enter a city name into the input field and click the **Search** button.
- The app sends a request to the [OpenBreweryDB API](https://api.openbrewerydb.org/) to fetch breweries based on the city name.
- A maximum of **10 results per page** are returned and displayed.

### 📄 Pagination

- The app starts on **Page 1** by default.
- Users can navigate using **Previous** and **Next** buttons.
- The **Next** button is disabled if fewer than 10 breweries are returned (meaning no next page).
- The **Previous** button is disabled on the first page.
- When a **new city is searched**, the app automatically resets to Page 1.

### ⚠️ Input Validation & Feedback

- If the input is **empty**, an error message is shown:  
  > "Please enter a city name."
- If a valid city has **no breweries**, a message is shown:  
  > "No breweries found."

### 🚦 Rate Limiting

- A **2-second delay** is enforced between API requests.
- If a user clicks **Next** or **Previous** too quickly (within 2 seconds), the request is blocked and a message is logged to the console:  
  > "Rate limit exceeded. Please wait."
- This prevents rapid, repeated requests to the API and improves user experience.

## 🛠 Tech Stack

- HTML
- JavaScript (ES6+)
- Tailwind CSS
