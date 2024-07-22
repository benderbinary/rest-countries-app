## Preview

Available on [https://rest-countries-app-mu.vercel.app/](https://rest-countries-app-mu.vercel.app/)

## Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/benderbinary/rest-countries-app.git
```

2. **Install dependencies:**

```bash
cd rest-countries-app
npm install
```

3. **Start the development server**

```bash
npm run dev
```

### Requirements

### Core Features

- [x] See all countries from the API on the homepage
- [x] Search for a country using an input field
- [x] Filter countries by region
- [x] Click on a country to see detailed information on a separate page (client-side routing)
- [x] Clicking on border countries links to their details

### Project Bonuses

- [x] Toggle the color scheme between light and dark mode without using any 3rd party libraries
- [x] Searching using the keywords Grmany or Grmny should also work (Fuzzy search using Fuse.js)
- [x] Add sorting functionality for population and country name
- [ ] Make all content server-side rendered and also have a fallback if the server-side render faces an error
- [x] Make sure the ratio for the country flags is 4:3 or any other ratio you find suitabls
- [ ] Add unit tests for components
- [ ] Store filters in URL query strings and sync with components
- [x] Add lazy loading for country images and list (used Suspense)
