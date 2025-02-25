## case study in React + TypeScript + Vite

##### The app will display news articles sourced from various websites, allowing users to filter and search based on content.

### Running Locally

1. Install dependencies:
   ```sh
   yarn install
   ```
2. Start the development server:
   ```sh
   yarn dev
   ```
3. The app will be available at `http://localhost:3000`.

### Using Docker

1. Build the Docker image:
   ```sh
   docker build -t case-study .
   ```
2. Run the container:
   ```sh
   docker run -p 3000:3000 case-study
   ```
3. The app will be available at `http://localhost:3000`.

Alternatively, you can use `docker-compose`:

```sh
docker-compose up --build
```
