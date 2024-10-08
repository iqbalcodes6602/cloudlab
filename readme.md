## Demo


https://github.com/user-attachments/assets/c24d1641-1193-470b-9b14-ac181c5542fc


## Installation

Run these commands in order to set up the project locally.

<br />

1. Clone this repository
    ```
    git clone https://github.com/iqbalcodes6602/cloudlab.git
    ```

2. Change directory to cloudlab
    ```
    cd cloudlab
    ```

3. Download the necessary dependencies using the script file:

   - If on Linux or Mac (Unix-like systems):
        ```
        sudo chmod +x docker_images.sh
        ```
        ```
        sudo ./docker_images.sh
        ```

   - If on Windows:
        ```
        docker_images.bat
        ```

4. Download the client dependencies
    ```
    cd client
    ```
    ```
    npm i
    ```

5. Download the server dependencies
    ```
    cd server
    ```
    ```
    npm i
    ```

6. Start the frontend: it will start at http://localhost:3000/
    ```
    cd client
    ```
    ```
    npm start
    ```

6. Start the backend: it will start at http://localhost:5000/
    ```
    cd server
    ```
    ```
    nodemon index.js
    ```

7. Start by creating an account or login as admin.
