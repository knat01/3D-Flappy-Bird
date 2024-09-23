# Flappy Bird 3D

PLAY THE GAME HERE:  3-d-flappy-bird.vercel.app/


Here's a video showcasing the project in action:

<iframe width="560" height="315" src="https://www.youtube.com/embed/E8htJIBL3X8?si=gTsNxw2V_Bd7P7NV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Controls](#controls)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

**Flappy Bird 3D** is an immersive 3D rendition of the classic Flappy Bird game. Leveraging modern web technologies, this application offers a visually stunning and smooth gaming experience directly in your browser. Navigate a bird through continuously moving pipes, aiming to achieve the highest score possible while enjoying metallic and reflective graphics enhanced by realistic environmental reflections.

## Features

- **3D Graphics:** Realistic 3D models for the bird and pipes using Three.js and React Three Fiber.
- **Reflective and Metallic Materials:** Enhanced visual appeal with metallic and reflective surfaces for all game elements.
- **Smooth Pipe Movement:** Pipes enter from the right, traverse smoothly across the screen, and exit to the left without abrupt disappearances.
- **Accurate Collision Detection:** Precise collision mechanics ensuring fair and challenging gameplay.
- **Responsive Controls:** Playable on both desktop and mobile devices using keyboard, mouse, and touch inputs.
- **Score Tracking:** Real-time score display with high score tracking saved in local storage.
- **Interactive UI:** Start and Game Over screens with interactive buttons styled with reflective materials.
- **Environment Reflections:** Realistic environmental reflections using Drei's Environment component.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **React Three Fiber (@react-three/fiber):** A React renderer for Three.js, enabling the creation of 3D graphics within React applications.
- **Drei (@react-three/drei):** A collection of useful helpers and abstractions for React Three Fiber.
- **Three.js (three):** A JavaScript 3D library used to create and display animated 3D computer graphics in the browser.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Howler.js (optional):** JavaScript audio library for adding sound effects (if integrated).

## Installation

### Prerequisites

- **Node.js & npm:** Ensure you have Node.js (version 14 or higher) and npm installed on your machine.
- **Git:** If deploying from a Git repository, ensure Git is installed.

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/flappy-bird-3d.git
   cd flappy-bird-3d
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Tailwind CSS:**

   If Tailwind CSS is not already set up, follow these steps:

   - **Initialize Tailwind CSS:**

     ```bash
     npx tailwindcss init
     ```

   - **Configure `tailwind.config.js`:**

     Ensure your `tailwind.config.js` includes the paths to all your components:

     ```javascript
     /** @type {import('tailwindcss').Config} */
     module.exports = {
       content: [
         "./src/**/*.{js,jsx,ts,tsx}",
       ],
       theme: {
         extend: {},
       },
       plugins: [],
     }
     ```

   - **Add Tailwind Directives to CSS:**

     In your `src/index.css` or equivalent, add the following:

     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

4. **Optional: Configure Sound Effects**

   If you plan to integrate sound effects using Howler.js, ensure you have the audio files placed in the `public` directory and import them appropriately in your components.

## Usage

1. **Start the Development Server:**

   ```bash
   npm start
   ```

2. **Open the Game:**

   Open your browser and navigate to `http://localhost:3000` to start playing.

## Deployment

Follow these steps to deploy the Flappy Bird 3D application:

1. **Build the Application:**

   ```bash
   npm run build
   ```

   This command creates an optimized production build of the application in the `build` directory.

2. **Serve the Application:**

   - **Using a Static Server:** Serve the `build` directory using a static server like `serve`.

     ```bash
     npm install -g serve
     serve -s build
     ```

   - **Using Node.js Server:** If the application requires a Node.js server, ensure the server script is set up correctly and start it.

     ```bash
     npm start
     ```

3. **Configure Web Server (Optional):**

   - **Nginx/Apache:** Set up a reverse proxy to forward requests to the Node.js server or serve static files.
   - **SSL/TLS:** Secure the application with HTTPS using certificates from Let's Encrypt or another certificate authority.

## Controls

- **Start Game:** Click the "Start Game" button on the start screen.
- **Flap:** Press the Spacebar, Click, or Tap anywhere on the screen to make the bird flap.
- **Restart Game:** Click the Restart button on the game over screen to play again.


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository:**

   Click the "Fork" button at the top right of the repository page.

2. **Create a Feature Branch:**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes:**

   ```bash
   git commit -m "Add some feature"
   ```

4. **Push to the Branch:**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request:**

   Navigate to the repository on GitHub and open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- **React Three Fiber:** For making Three.js accessible in React.
- **Drei:** For providing helpful abstractions and components.
- **Three.js:** For the powerful 3D graphics capabilities.
- **Tailwind CSS:** For easy and efficient styling.

