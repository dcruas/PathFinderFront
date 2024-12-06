# Pathfinder Roll Outcome Calculator

This is a web application built with React and TypeScript that calculates the possible outcomes of a roll in Pathfinder. By providing a Difficulty Class (DC) and a modifier, the system evaluates all possible dice combinations and determines how many critical successes, successes, failures, and critical failures can occur.

## Features

- Calculates outcomes for any given DC and modifier.
- Supports all standard dice combinations in Pathfinder.
- Clear and easy-to-use interface.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [Docker](https://www.docker.com/) (optional, for containerized setup)

---

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/pathfinder-calculator.git
    cd pathfinder-calculator
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Alternatively, build and run the Docker container:
    ```bash
    docker build -t pathfinder-calculator .
    docker run --name pathfinderfront -p 3000:3000 pathfinder-calculator
    ```


The app will be available at [http://localhost:3000](http://localhost:3000).
