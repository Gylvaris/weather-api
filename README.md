# Weather API - Roadmap.sh project

Simple weather API that fetches data from third-party service (WeatherAPI) and in-memory caching via node-cache. Build with Node.js, Hono and zod.

## Instalation 

### Prerequisites

- Node 22
- pnpm
  
### Installation

1. Clone the repository:

```
git clone https://github.com/Gylvaris/weather-api.git
cd weather-api
```

2. Install dependencies:

```
pnpm i
```

3. Create a .env file in the project using content of .env.template:

```
NODE_ENV=development 
API_KEY=xyz #paste your API key here 
```

4. Start project with:

```
pnpm dev
```

### Usage

1. The API will be available at `http://localhost:3000`
2. To get weather data for a city, make a GET request to `/weather/:city`, where `:city` is the name for the city you want to query.
Example:
```
http://localhost:3000/weather/Warsaw
```