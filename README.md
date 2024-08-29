## Introduction
This project serves as a comprehensive demonstration of building a robust 
API using cutting-edge technologies, including PostgreSQL, Next.js, 
Docker, and Docker Compose. 
The goal is to showcase the implementation of essential API features, 
such as rate limiting and pagination, while maintaining a modular and 
scalable architecture.

## Technologies Used

- **PostgreSQL:** A powerful, open-source relational database system, chosen for its reliability and scalability.

- **Next.js:** A React framework for building server-side rendered and statically generated web applications.

- **Docker:** Containerization technology to ensure consistent deployment across different environments.

- **Docker Compose:** A tool for defining and running multi-container Docker applications.

- **Prisma:** to manage PostgreSQL

### Database setup
```
pnpm prisma init
```

```
pnpm prisma migrate dev --name {migration-name}
```

Apply migrations
```
pnpm prisma migrate deploy
```

Create client
```
pnpm prisma generate
```

## Features

1. **Database Integration:**
   - Integrated with a PostgreSQL database using prisma.

2. **Data Pagination:**
   - Implemented pagination for large datasets for improved performance.

4. **Rate Limiting:**
   - Implemented rate limiting for specific endpoints to control client requests.

7.  **Testing:**
    - Wrote unit tests and integration tests using Pytest.

8. **Dockerization:**
    - Dockerized the nextjs application for consistent deployment environments.
    - Used Docker Compose for managing multi-container applications (frontend, postgres, redis).

9. **Database Migrations:**
    - Implemented database migrations using Prisma to manage schema changes.

10. **Cross-Origin Resource Sharing (CORS):**
    - Enabled CORS to control API access from different domains.

11. **Environmental Configuration:**
    - Used environment variables for configuration settings.

12. **Implemented frontend:**
    - Used Nextjs to develop a frontend to interact with the API. Utilized docker compose for communication between frontend and backend.

## Setup

### Cloning and Environment Setup
1. Clone the repository: `git clone  git@github.com:apogoreliy/nextjs_app.git`
2. Navigate to the project directory: `nextjs_app`

### Running the Project Using Docker
1. Ensure Docker and Docker Compose are installed.
2. Navigate to the project directory: `cd yourproject`
3. Build and start the containers: `docker-compose up --build`
4. Access the frontend built with nextjs and (https://v0.dev)[v0.dev] at `http://localhost:3000`

## Deployment
For deployment I used Koyeb. Koyeb is a developer-friendly serverless platform to deploy apps globally. No-ops, servers, or infrastructure management. You can learn more about it here: `https://www.koyeb.com/tutorials/deploy-apps-using-docker-compose-on-koyeb`

Follow the steps below to deploy and run the docker-compose application on your Koyeb account.

### Requirements

You need a Koyeb account to successfully deploy and run this application. If you don't already have an account, you can sign-up for free [here](https://app.koyeb.com/auth/signup).

## Logging and Metrics

### Prometheus

[Prometheus](https://prometheus.io/) is used to collect and store metrics from your FastAPI application. It gathers data from various services and components, providing insights into the performance and behavior of your application.

#### Configuration

The Prometheus configuration is defined in the `prometheus_data/prometheus.yml` file. Make sure to customize this file based on your application's specific metrics and requirements.

#### Accessing Prometheus

Prometheus can be accessed at [http://localhost:9090](http://localhost:9090) in your local development environment.

### Grafana

[Grafana](https://grafana.com/) is utilized for visualizing and analyzing the metrics collected by Prometheus. It offers powerful tools for creating dashboards and monitoring the health of your application.

#### Configuration

No specific Grafana configuration is needed for basic functionality. However, you can customize Grafana settings and dashboards based on your monitoring needs.

To learn more about this you can read this article: https://dev.to/ken_mwaura1/getting-started-monitoring-a-fastapi-app-with-grafana-and-prometheus-a-step-by-step-guide-3fbn

#### Accessing Grafana

Grafana is accessible at [http://localhost:4000](http://localhost:4000) in your local development environment.

#### Default Credentials

- **Username:** admin
- **Password:** admin

## License
This project is licensed under the MIT LICENSE - see the [LICENSE](./LICENSE) file for details.
