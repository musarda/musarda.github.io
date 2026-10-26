window.PROJECTS = [
  {
    title: "Ethical Hacker FAQ",
    slug: "ethical-hacker-faq",
    summary: "An introductory guide and FAQ on ethical hacking: what it is, the skills and education it takes, career paths and why it matters.",
    description: `
      # Ethical Hacker: Assurance of the Digital World

      ### Introduction

      Today, the digital world has become the center of our lives, bringing with it serious security risks. Cyberattacks, data breaches, and online crimes are on the rise. It is at this juncture that ethical hackers play a crucial role. In this article, we will open the doors to the world of ethical hacking and guide you in exploring this critical profession.

      > [!IMPORTANT]
      > These Articles Are Written For Informational Purposes Only!

      ## What is Ethical Hacking?
      Ethical hacking is the process of legally and ethically testing computer systems, networks, and software. Ethical hackers work to identify and rectify security vulnerabilities that malicious attackers could exploit. In this section, we will explain the fundamental concepts and purposes of ethical hacking.

      ## What Skills Are Required to Become an Ethical Hacker?
      To become an ethical hacker, you need specific skills and abilities. In this section, we will discuss the technical skills that ethical hackers should possess and why expertise in programming, network security, data analysis, and security tools is crucial.

      ## How Does One Obtain Education as an Ethical Hacker?
      Education is essential for becoming an ethical hacker. In this section, we will provide information on available educational resources for aspiring ethical hackers. We will discuss cybersecurity certifications, training courses, and available resources from universities and online platforms.

      ## The Career Path in Ethical Hacking
      In this section, we will outline the career path in ethical hacking. We will explain the types of jobs ethical hackers can work in, which industries demand their skills, and what a career in this field entails.

      ## The Significance of Ethical Hacking
      Highlight the importance of ethical hacking and how it makes a difference in the field of cybersecurity. Explain why securing the digital world is crucial and how ethical hacking contributes to this goal.

      ## Pages:
      * **[What is Required](https://github.com/musarda/Ethical-Hacker-FAQ/blob/main/src/What-is-Required.md)**
      * **[FAQs](https://github.com/musarda/Ethical-Hacker-FAQ/blob/main/src/faq.md)**
      * **[Ethical Hacking](https://github.com/musarda/Ethical-Hacker-FAQ/blob/main/src/Ethical-Hacking.md)**

      ## License

      This project is licensed under the [MIT License](https://github.com/musarda/Ethical-Hacker-FAQ/blob/main/LICENSE).
    `,
    tags: ["Cybersecurity", "Guide"],
    status: "Completed",
    date: "2023-09",
    repo: "https://github.com/musarda/Ethical-Hacker-FAQ",
    demo: "",
    featured: false,
    accent: "#f87171",
  },

  {
    title: "Discord JavaScript Bot",
    slug: "discord-javascript-bot",
    summary: "A simple Discord bot created using JavaScript and the Discord.js library.",
    description: `
      # Discord Bot with JavaScript

      This is a simple Discord bot created using JavaScript and the Discord.js library.

      > [!NOTE]
      > This Bot is for Example Purposes Only.

      ## Features

      - Responds to the "!ping" command with "Pong!"
      - Easily customizable and extendable

      ## Usage

      1. Clone this repository to your local machine.
      2. Install Node.js if you haven't already: [Node.js Download](https://nodejs.org/).
      3. Install the required dependencies using \`npm install\`.
      4. Create a bot on the Discord Developers Portal and obtain a bot token.
      5. Add your bot token to the \`config.json\` file.
      6. Run the bot using \`node bot.js\`.

      > [!IMPORTANT]
      > You Need Code Editor to Run the Code.

      ### Get Your Bot Token
      After successfully creating your bot, you will need to get the bot's token. This token is used to authenticate your bot. You can get your token with the following steps:
      1. Go to the "Bot" tab on the left.
      2. Click the "Copy" button in the "Token" section to copy the token to the clipboard.

      > [!WARNING]
      > Do Not Share Discord Bot Tokens with Others. Otherwise, your bot may be stolen.

      ## Create Discord Bot
      First you need to create a bot on the Discord Developers Portal:
      1. Go to the [Discord Developers Portal](https://discord.com/developers/applications)
      2. Create a new application and give it a name. This will be the name of your bot.
      3. Go to the "Bot" tab on the left and click the "Add Bot" button.
      4. You can customize your bot, but you can skip this step and use the default settings.

      ## Commands

      - \`!ping\`: Replies with "Pong!"
      - Add more custom commands in the \`bot.js\` file.

      ## Code

      <details>
        <summary>Full Code</summary>

        \`\`\`js
      const Discord = require('discord.js');
      const client = new Discord.Client();
      const token = 'YOUR_BOT_TOKEN'; // Add your bot's token here

      client.on('ready', () => {
        console.log(\`Logged in as \${client.user.tag}\`);
      });

      client.on('message', (message) => {
        if (message.content === '!ping') {
          message.reply('Pong!');
        }
      });

      client.login(token);
        \`\`\`
      </details>

      This JavaScript code represents a basic Discord bot that responds to the \`!ping\` command with \`Pong!\` when invoked. Here's an explanation of the code:

      \`\`\`js
      const Discord = require('discord.js'); // Import the discord.js library.
      const client = new Discord.Client();    // Create a new Discord client instance.
      const token = 'YOUR_BOT_TOKEN';         // Replace 'YOUR_BOT_TOKEN' with your actual bot's token.

      client.on('ready', () => {
        console.log(\`Logged in as \${client.user.tag}\`);
      });
      \`\`\`
      1. We start by importing the \`discord.js\` library, which allows us to interact with the Discord API. This library simplifies the process of creating Discord bots in JavaScript.
      2. Next, we create a new instance of the Discord \`client\` and assign it to the client variable. This \`client\` object will be responsible for managing our bot's interactions with the Discord server.
      3. We store the bot's \`token\` in the token variable. You should replace \`YOUR_BOT_TOKEN\` with the actual token you obtain when creating your Discord bot through the Discord Developer Portal.
      4. The \`client.on('ready', () => { ... })\` block is an event listener. It listens for the 'ready' event, which occurs when the bot successfully logs in to the Discord server. When this event is triggered, the code inside the arrow function is executed, and it logs a message to the console, displaying the bot's username and tag.

      \`\`\`js
      client.on('message', (message) => {
        if (message.content === '!ping') {
          message.reply('Pong!');
        }
      });
      \`\`\`
      1. The \`client.on('message', (message) => { ... })\` block is another event listener. It listens for the 'message' event, which is triggered every time a message is sent in any channel that the bot has access to.
      2. Inside the 'message' event handler, we check if the content of the message is equal to "!ping" using \`if (message.content === '!ping') { ... }\`. If the message content matches "!ping," the following code block is executed:
         - \`message.reply('Pong!');\` sends a reply to the message with the text "Pong!" This is how the bot responds to the "!ping" command with "Pong!" in the same channel where the command was issued.

      \`\`\`js
      client.login(token); // Log in to Discord using the bot's token.
      \`\`\`
      1. Finally, we log in to the Discord server using \`client.login(token)\`. This is where the bot's token is used for authentication, allowing the bot to connect to the server and respond to events.

      ## Clone
      \`\`\`git
      gh repo clone musarda/Discord-JavaScript-Bot
      \`\`\`

      ## License

      This project is licensed under the [MIT License](https://github.com/musarda/Discord-JavaScript-Bot/blob/main/LICENSE).
    `,
    tags: ["Discord", "Bot", "JavaScript"],
    language: "JavaScript",
    status: "Completed",
    date: "2023-09",
    repo: "https://github.com/musarda/Discord-JavaScript-Bot",
    demo: "",
    featured: false,
    accent: "#7c8cff",
    code: [
      {
        title: "bot.js",
        content: `
          const Discord = require('discord.js');
          const client = new Discord.Client();
          const token = 'YOUR_BOT_TOKEN'; // Add your bot's token here

          client.on('ready', () => {
          console.log(\`Logged in as \${client.user.tag}\`);
          });

          client.on('message', (message) => {
          if (message.content === '!ping') {
            message.reply('Pong!');
          }

          if (message.content === 'owner') {
            message.reply('https://musarda.github.io');
          }

          });

          client.login(token);
        `,
      },
    ],
  },

  {
    title: "Ultrasonic Security System",
    slug: "ultrasonic-security-system",
    summary: "A simple tutorial on building a small security device with an Arduino, an HC-SR04 ultrasonic sensor, LEDs and a buzzer.",
    description: `
      # Ultrasonic Security System

      It is a **simple** tutorial on how to create **little a security** device using an **Arduino**.

      > [!WARNING]
      > This is for Educational and Informational Purposes Only.

      ## Contents
      - **[Setup](#setup)**
         * **[On Ultrasonic Sensor](#on-ultrasonic-sensor)**
         * **[LEDs](#leds)**
         * **[Example](#example)**
      - **[Assembly - Breadboard](#assembly---breadboard)**
      - **[Assembly - Ultrasonic Sensor](#assembly---ultrasonic-sensor)**
      - **[Assembly - LEDs](#assembly---leds)**
      - **[Assembly - Buzzer](#assembly---buzzer)**
      - **[Code](#code)**
      - **[Folders](#folders)**
      - **[Clone](#clone)**
      - **[License](#license)**

      ## Components

      * **Arduino UNO**
      * **Breadboard**
      * **Buzzer**
      * **Ultrasonic Sensor - HC-SR04**
      * **Resistor 221 ohm**
      * **LED**
      * **Jumper wires**

      ## Project description

      ### Setup

      ![Setup|400](assets/projects/ultrasonic-security-system/setup.png)

      **Connect** a **red** wire from the **5V pin** on the **Arduino** to the **positive channel** of the **breadboard**. Connect a **black** wire from the **GND pin** on the **Arduino** to the **negative channel** of the breadboard:

      \`\`\`ino
      Buzzer = pin 7
      \`\`\`
      #### On Ultrasonic Sensor:

      \`\`\`ino
      Echo = pin 3
      Trig = pin 2
      \`\`\`

      #### LEDs:

      \`\`\`ino
      RedLED = pin 4
      YellowLED = pin 5
      GreenLED = pin 6
      \`\`\`

      #### Example

      \`\`\`ino
      #define trigPin 2
      #define echoPin 3
      #define soundbuzzer 7
      #define LEDlampRed 4
      #define LEDlampYellow 5
      #define LEDlampGreen 6
      \`\`\`

      The **green** wires connected to the **LEDs** should be connected in line to the **positive** side of the **LED**, while the **negative** side of the **LED** should be **connected** to the **negative channel** of the **breadboard** using a **220 ohm** resistor.

      > [!IMPORTANT]
      > Make Sure The Connections Are Made Correctly Otherwise It May Not Work Correctly.

      ### Assembly - Breadboard

      ![img-breadboard|400](assets/projects/ultrasonic-security-system/breadboard.png)

      Firstly, let's connect the **5V** and **GND pin** on the **Arduino** to the **breadboard**. As I mentioned before, be sure that the wire attached to the **5V pin** is connected to the **positive channel** of the **breadboard**, and the wire attached to the **GND pin** is connected to the **negative channel** of the **breadboard**.

      ### Assembly - Ultrasonic Sensor

      ![img-hc-sr04|400](assets/projects/ultrasonic-security-system/hc-sr04.png)

      Time to connect the **HC-SRO4 ultrasonic sensor**! A great tip is to place the ultrasonic sensor as far right to the **breadboard** as possible and make sure that it is facing out. Referring back to the **setup picture**, you should connect the **GND pin** on the **ultrasonic sensor** to the **negative channel** on the **breadboard**. Next connect the **Trig pin** on the sensor to pin **2** on the **Arduino** and connect the **Echo pin** on the sensor to pin **3** on the **Arduino**. Lastly, connect the **VCC pin** on the **ultrasonic sensor** to the **positive channel** on the **breadboard**. Refer to the picture above if anything gets confusing.

      ### Assembly - LEDs

      ![img-led|400](assets/projects/ultrasonic-security-system/led.png)

      The next step is to connect the **LED's** to the **breadboard** and **Arduino**. If you need to, I highly recommend that you refer back to the setup picture **(Step 2)**, attaching the **LEDs** is pretty easy, there's a lot of repetition. Let's first attach the **Green LED**. So the way to do this, is to connect the anode **(the longer leg)** to pin **6** on the **Arduino** with a **green** wire, and to **connect** the cathode **(the shorter leg)** to the **negative channel** on the **breadboard**, using a **220 ohm** resistor. Then repeat that step for the **Yellow** and then the **Red LED**, make sure to **connect** the anode **(the longer leg)** of the **yellow LED** to pin **5** on the **Arduino** and then **connect** the anode of the **red LED** to pin **6**. Once you have done that, your setup should look similar to the picture above.
      **Resistors** are not absolutely necessary, however they are highly recommended to be used.

      ### Assembly - Buzzer

      ![buzzer|400](assets/projects/ultrasonic-security-system/setup.png)

      The last part of the setup for this, is connecting the **buzzer** to the **breadboard** and the **Arduino**. This is one of the easiest parts of the whole setup. All that is required to do is to connect the **longer leg** of the **buzzer** to pin **7** of the **Arduino** using a **green** wire and then connect the **shorter leg** of the **buzzer** to the **negative channel** of the **breadboard** using a **220 ohm** resistor.
      It is highly recommended to use a **resistor** in connecting the **shorter leg** of the **buzzer** to the **negative channel** of the **breadboard**. This greatly reduces the volume of the **buzzer** and prevent it from dying to quickly.

      ## Code

      - Pin Definitions:
        * \`trigPin\` is defined as the trigger pin of the ultrasonic sensor.
        * \`echoPin\` is defined as the echo pin of the sensor.
        * \`soundbuzzer\` is defined as a pin used for an audible alert through a buzzer.
        * \`LEDlampRed\` controls a red LED light.
        * \`LEDlampYellow\` controls a yellow LED light.
        * \`LEDlampGreen\` controls a green LED light.

      - \`sound\` Variable:
        * The \`sound\` variable represents the frequency at which the buzzer will sound.

      - \`setup()\` Function:
        * It initializes serial communication \`(9600 baud)\`.
        * Sets the pin modes: \`trigPin\` is set as an output, while \`echoPin\`, \`LEDlampRed\`, \`LEDlampYellow\`, \`LEDlampGreen\`, and \`soundbuzzer\` are set as input/output pins.

      <details>
      <summary>Code</summary>

      \`\`\`ino
      void setup() {

          Serial.begin (9600);
          pinMode(trigPin,  OUTPUT);
          pinMode(echoPin, INPUT);
          pinMode(LEDlampRed, OUTPUT);
          pinMode(LEDlampYellow,  OUTPUT);
          pinMode(LEDlampGreen, OUTPUT);
          pinMode(soundbuzzer, OUTPUT);
      }
      \`\`\`
      </details>

      - \`loop()\` Function:
        * It performs distance measurement with the **ultrasonic sensor**.
        * Then, it carries out different actions based on specific distance thresholds:
          - If the measured distance is less than **50 cm**, it turns on the **green LED**.
          - If the measured distance is less than **20 cm**, it turns on the **yellow LED**.
          - If the measured distance is less than **5 cm**, it turns on the **red LED** and activates the **buzzer** at a specific frequency.
          - If the measured distance is above **5 cm** or there is no valid distance measurement, it prints "Outside the permissible range of distances" to the serial monitor and turns off the buzzer.
          - It also prints the measured distance to the serial monitor.

      <details>
      <summary>Code</summary>

      \`\`\`ino
      void  loop() {

          long durationindigit, distanceincm;

          digitalWrite(trigPin, LOW);
          delayMicroseconds(2);
          digitalWrite(trigPin, HIGH);
          delayMicroseconds(10);
          digitalWrite(trigPin, LOW);

          durationindigit = pulseIn(echoPin, HIGH);
          distanceincm = (durationindigit/5) / 29.1;

          if (distanceincm < 50) {
              digitalWrite(LEDlampGreen, HIGH);
          }
          else {
              digitalWrite(LEDlampGreen,  LOW);
          }

          if (distance < 20) {
              digitalWrite(LEDlampYellow,  HIGH);
          }
          else {
              digitalWrite(LEDlampYellow,LOW);
          }

          if (distance  < 5) {
              digitalWrite(LEDlampRed, HIGH);
              sound = 1000;
          }
          else  {
              digitalWrite(LEDlampRed,LOW);
          }

          if (distanceincm > 5 ||  distanceinsm <= 0){
              Serial.println("Outside the permissible range of distances");
              noTone(soundbuzzer);
          }
          else {
              Serial.print(distance);
              Serial.println("  cm");
              tone(buzzer, sound);
          }

          delay(300);
        }
      \`\`\`
      </details>

      - It creates a loop with **delay(300)**, so the sensor periodically measures distance and processes the results.

      <details>
      <summary>Click To See All Code</summary>

      **[Code](https://github.com/musarda/Ultrasonic-Security-System/tree/main/src/code)**

      \`\`\`ino
      #define trigPin 2
      #define echoPin 3
      #define soundbuzzer 7
      #define LEDlampRed 4
      #define LEDlampYellow 5
      #define LEDlampGreen 6

      int sound  = 500;


      void setup() {

          Serial.begin (9600);
          pinMode(trigPin,  OUTPUT);
          pinMode(echoPin, INPUT);
          pinMode(LEDlampRed, OUTPUT);
          pinMode(LEDlampYellow,  OUTPUT);
          pinMode(LEDlampGreen, OUTPUT);
          pinMode(soundbuzzer, OUTPUT);
      }

      void  loop() {

          long durationindigit, distanceincm;

          digitalWrite(trigPin, LOW);
          delayMicroseconds(2);
          digitalWrite(trigPin, HIGH);
          delayMicroseconds(10);
          digitalWrite(trigPin, LOW);

          durationindigit = pulseIn(echoPin, HIGH);
          distanceincm = (durationindigit/5) / 29.1;

          if (distanceincm < 50) {
              digitalWrite(LEDlampGreen, HIGH);
          }
          else {
              digitalWrite(LEDlampGreen,  LOW);
          }

          if (distance < 20) {
              digitalWrite(LEDlampYellow,  HIGH);
          }
          else {
              digitalWrite(LEDlampYellow,LOW);
          }

          if (distance  < 5) {
              digitalWrite(LEDlampRed, HIGH);
              sound = 1000;
          }
          else  {
              digitalWrite(LEDlampRed,LOW);
          }

          if (distanceincm > 5 ||  distanceinsm <= 0){
              Serial.println("Outside the permissible range of distances");
              noTone(soundbuzzer);
          }
          else {
              Serial.print(distance);
              Serial.println("  cm");
              tone(buzzer, sound);
          }

          delay(300);
      }
      \`\`\`
      </details>

      ### Folders

      **[You can view the files here](https://github.com/musarda/Ultrasonic-Security-System/tree/main/src)**

      ## Clone

      \`\`\`git
      git clone musarda/Ultrasonic-Security-System
      \`\`\`
      ## License
      This project is **licensed** under the **[MIT License.](https://github.com/musarda/Ultrasonic-Security-System/blob/main/LICENSE)**
    `,
    cover: "assets/projects/ultrasonic-security-system/setup.png",
    images: [
      { src: "assets/projects/ultrasonic-security-system/setup.png", caption: "Full setup" },
      { src: "assets/projects/ultrasonic-security-system/breadboard.png", caption: "Breadboard power rails" },
      { src: "assets/projects/ultrasonic-security-system/hc-sr04.png", caption: "HC-SR04 ultrasonic sensor" },
      { src: "assets/projects/ultrasonic-security-system/led.png", caption: "LEDs" },
    ],
    tags: ["Arduino", "HC-SR04", "Electronics"],
    language: "C++",
    status: "Completed",
    date: "2023-09",
    repo: "https://github.com/musarda/Ultrasonic-Security-System",
    demo: "",
    featured: false,
    accent: "#22d3ee",
    code: [
      {
        title: "code.ino",
        content: `
          #define trigPin 2
          #define echoPin 3
          #define soundbuzzer 7
          #define LEDlampRed 4
          #define LEDlampYellow 5
          #define LEDlampGreen 6

          int sound  = 500;


          void setup() {

              Serial.begin (9600);
              pinMode(trigPin,  OUTPUT);
              pinMode(echoPin, INPUT);
              pinMode(LEDlampRed, OUTPUT);
              pinMode(LEDlampYellow,  OUTPUT);
              pinMode(LEDlampGreen, OUTPUT);
              pinMode(soundbuzzer, OUTPUT);
          }

          void  loop() {

              long durationindigit, distanceincm;

              digitalWrite(trigPin, LOW);
              delayMicroseconds(2);
              digitalWrite(trigPin, HIGH);
              delayMicroseconds(10);
              digitalWrite(trigPin, LOW);

              durationindigit = pulseIn(echoPin, HIGH);
              distanceincm = (durationindigit/5) / 29.1;

              if (distanceincm < 50) {
                  digitalWrite(LEDlampGreen, HIGH);
              }
              else {
                  digitalWrite(LEDlampGreen,  LOW);
              }

              if (distance < 20) {
                  digitalWrite(LEDlampYellow,  HIGH);
              }
              else {
                  digitalWrite(LEDlampYellow,LOW);
              }

              if (distance  < 5) {
                  digitalWrite(LEDlampRed, HIGH);
                  sound = 1000;
              }
              else  {
                  digitalWrite(LEDlampRed,LOW);
              }

              if (distanceincm > 5 ||  distanceinsm <= 0){
                  Serial.println("Outside the permissible range of distances");
                  noTone(soundbuzzer);
              }
              else {
                  Serial.print(distance);
                  Serial.println("  cm");
                  tone(buzzer, sound);
              }

              delay(300);
          }
        `,
      },
    ],
  },

  {
    title: "Popular Programming Languages",
    slug: "popular-programming-languages",
    summary: "A beginner-friendly guide to Python, JavaScript, Java, C++ and Ruby, with a sample program in each language.",
    description: `
      # Comprehensive Guide to the World's Most Popular Programming Languages

      Welcome to our comprehensive guide that introduces and explains the most widely used programming languages in the software development landscape. In this project, we aim to provide in-depth insights into each programming language, making it an invaluable resource for developers, employers, and anyone interested in the world of coding.

      ## Why You Should Explore This Project

      - **For Beginners:** If you are new to programming, this guide will serve as an excellent starting point. We break down complex concepts and offer practical examples to help you grasp the fundamentals.

      - **For Hiring Managers:** As an employer, understanding the strengths and applications of various programming languages is crucial when building a tech team. This project will assist you in evaluating candidates and making informed hiring decisions.

      - **For Developers:** Whether you're a seasoned developer or looking to expand your skill set, you'll find detailed information on each language, helping you decide which one best suits your project's needs.

      > [!WARNING]
      > The Information in This Project Is For Exemplary Purposes Only and Its Purposes May Vary.

      ## Featured Programming Languages

      This guide covers several of the most influential and commonly used programming languages, including:

      - **[Python](#python)**
      - **[JavaScript](#javascript)**
      - **[Java](#java)**
      - **[C++](#c++)**
      - **[Ruby](#ruby)**

      ## Python

      **Python** is a versatile, high-level programming language known for its readability and simplicity. It's an excellent choice for both beginners and experienced developers.

      ### Sample Code

      \`\`\`python
      print("Hello, World!")
      \`\`\`
      **[Browse Python Codes](https://github.com/musarda/Popular-Programming-Languages/tree/main/src/python)**

      ## JavaScript

      **JavaScript** is the backbone of web development, used to create dynamic and interactive web applications that run in browsers.

      ### Sample Code

      \`\`\`js
      console.log("Hello, World!");
      \`\`\`
      **[Browse JavaScript Codes](https://github.com/musarda/Popular-Programming-Languages/tree/main/src/javascript)**

      ## Java

      **Java** is a platform-independent language often utilized for building large-scale applications. It offers robust performance and a rich ecosystem.

      ### Sample Code

      \`\`\`java
      public class HelloWorld {
          public static void main(String[] args) {
              System.out.println("Hello, World!");
          }
      }
      \`\`\`
      **[Browse Java Codes](https://github.com/musarda/Popular-Programming-Languages/tree/main/src/java)**

      ## C++

      **C++** is a high-performance language commonly employed for resource-intensive applications, such as game development.

      ### Sample Code

      \`\`\`cpp
      #include <iostream>
      using namespace std;

      int main() {
          cout << "Hello, World!" << endl;
          return 0;
      }
      \`\`\`
      **[Browse C++ Codes](https://github.com/musarda/Popular-Programming-Languages/tree/main/src/cpp)**

      ## Ruby

      **Ruby** is a user-friendly, open-source language commonly used with the Ruby on Rails framework for web application development.

      ### Sample Code

      \`\`\`ruby
      puts "Hello, World!"
      \`\`\`

      > [!IMPORTANT]
      > This Project Is For Example Purposes Only.

      ## Creating a Clone

      \`\`\`git
      git clone https://github.com/musarda/Popular-Programming-Languages.git
      \`\`\`

      ## License
      This project is licensed under the **[MIT License.](https://github.com/musarda/Popular-Programming-Languages/blob/main/LICENSE)**
    `,
    tags: ["Python", "JavaScript", "Java", "C++"],
    language: "JavaScript",
    status: "Completed",
    date: "2023-09",
    repo: "https://github.com/musarda/Popular-Programming-Languages",
    demo: "",
    featured: false,
    accent: "#f59e0b",
    code: [
      {
        title: "code.py",
        content: `
          # Input matrices
          matrix1 = [[1, 2], [3, 4]]
          matrix2 = [[4, 5], [6, 7]]

          # Printing elements of matrix1
          print("Printing elements of first matrix")
          for row in matrix1:
          	for element in row:
          		print(element, end=" ")
          	print()

          # Printing elements of matrix2
          print("Printing elements of second matrix")
          for row in matrix2:
          	for element in row:
          		print(element, end=" ")
          	print()

          # Subtracting two matrices
          result = [[0, 0], [0, 0]]
          for i in range(len(matrix1)):
          	for j in range(len(matrix1[0])):
          		result[i][j] = matrix1[i][j] - matrix2[i][j]

          # Printing the result
          print("Subtraction of two matrix")
          for row in result:
          	for element in row:
          		print(element, end=" ")
          	print()
        `,
      },
      {
        title: "code.js",
        content: `
          // program to solve quadratic equation
          let root1, root2;

          // take input from the user
          let a = prompt("Enter the first number: ");
          let b = prompt("Enter the second number: ");
          let c = prompt("Enter the third number: ");

          // calculate discriminant
          let discriminant = b * b - 4 * a * c;

          // condition for real and different roots
          if (discriminant > 0) {
              root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
              root2 = (-b - Math.sqrt(discriminant)) / (2 * a);

              // result
              console.log(\`The roots of quadratic equation are \${root1} and \${root2}\`);
          }

          // condition for real and equal roots
          else if (discriminant == 0) {
              root1 = root2 = -b / (2 * a);

              // result
              console.log(\`The roots of quadratic equation are \${root1} and \${root2}\`);
          }

          // if roots are not real
          else {
              let realPart = (-b / (2 * a)).toFixed(2);
              let imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);

              // result
              console.log(
              \`The roots of quadratic equation are \${realPart} + \${imagPart}i and \${realPart} - \${imagPart}i\`
            );
          }
        `,
      },
      {
        title: "code.java",
        content: `
          public class Frequency {

              public static void main(String[] args) {
                  String str = "This website is awesome.";
                  char ch = 'e';
                  int frequency = 0;

                  for(int i = 0; i < str.length(); i++) {
                      if(ch == str.charAt(i)) {
                          ++frequency;
                      }
                  }

                  System.out.println("Frequency of " + ch + " = " + frequency);
              }
          }
        `,
      },
      {
        title: "code.cpp",
        content: `
          #include <iostream>
          using namespace std;

          int main() {
              int num, originalNum, remainder, result = 0;
              cout << "Enter a three-digit integer: ";
              cin >> num;
              originalNum = num;

              while (originalNum != 0) {
                  // remainder contains the last digit
                  remainder = originalNum % 10;

                  result += remainder * remainder * remainder;

                  // removing last digit from the orignal number
                  originalNum /= 10;
              }

              if (result == num)
                  cout << num << " is an Armstrong number.";
              else
                  cout << num << " is not an Armstrong number.";

              return 0;
          }
        `,
      },
    ],
  },

  {
    title: "Random Password Generator",
    slug: "random-password-generator",
    summary: "A simple web app that generates a random password and copies it to the clipboard.",
    description: `
      <div align="center">

      # Random Password Generater

      </div>

      <div align="center">
      This is a simple web based sample **Random Password Generater** application.
      </div>

      ## Images
      ![HC-SR04|250](assets/projects/random-password-generator/app.png) ![Generate|250](assets/projects/random-password-generator/generate.png) ![Copy|250](assets/projects/random-password-generator/copy.png)

      ## How to use

      First of all, we need a code editor with which we can run the code, so we will use **Visual Studio Code** in this project.

      1. **[Download](https://code.visualstudio.com/)** **Visual Studio Code**,
      2. **Copy [Code](https://github.com/musarda/Random-Password-Generater/tree/main/Code)** Folder After Installing Visual Studio Code,
      3. After Uploading the Code to **Visual Studio Code**, **Right Click** on the **index.html** file > **Click Reveal in File Explorer** and **Open the Chrome** File Named **Index in the Folder**,
      4. **Random Password Generator Ready! Remember This Is Just An Example.**

      ## Features

      - **Random password generation**
      - **Copying the password to the clipboard**

      ## Setup

      \`\`\`bash
      gh repo clone musarda/Random-Password-Generater
      \`\`\`

      ## Code
      **You can reach [here](https://github.com/musarda/Random-Password-Generater/tree/main/Code)**

      ### HTML
      \`\`\`html
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="style.css">
          <title>musarda | Random Password Generater</title>
      </head>
      <body>
          <div class="body">
              <div class="box">
                  <h2>Random Password Generater</h2>
                  <input type="text" name="" placeholder="Create password" id="password" readonly>
                  <table>
                      <th><div id="button" class="btn1"onclick="genPassword()">Generate</div></th>
                      <th><a  id="button" class="btn2" onclick="copyPassword()">Copy</a></th>
                  </table>
              </div>
          </div>
          <script src="./script.js"></script>
      </body>
      </html>
      \`\`\`
      ### CSS
      \`\`\`css
      * {
          margin: 0;
          padding: 0;
          user-select: none;
          box-sizing: border-box;
      }

      body {
          background-color: #212121;
          justify-content: center;
          align-items: center;
          display: flex;
          min-height: 100vh;
      }

      .box {
          background-color: rgb(197, 197, 197);
          padding-top: 30px;
          padding: 30px;
          border-radius: 12px;
      }

      .box h2 {
          margin-bottom: 40px;
          text-align: center;
          font-size: 26px;
          color: #131313;
          font-family: sans-serif;
      }

      input {
          padding: 20px;
          user-select: none;
          height: 50px;
          width: 400px;
          border-radius: 6px;
          border: none;
          border: 2px solid #212121;
          outline: none;
          font-size: 22px;
      }

      input::placeholder {
          font-size: 23px;
      } 

      #button {
          font-family: sans-serif;
          font-size: 15px;

          margin-top: 40px;
          border: 2px solid #212121;
          width: 155px;
          height: 50px;
          text-align: center;
          background-color: #6b6b6b;
          display: flex;
          color: #fff;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 7px;
      } 

      .btn2 {
          margin-left: 85px
      }

      #button:hover {
          color: white;
          background-color: #212121;
      }
      \`\`\`
      ### JavaScript
      \`\`\`js
      var password = document.getElementById("password");
      function genPassword() {
          var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          var passwordLength = 12;
          var password = "";
          for (var i = 0; i <= passwordLength; i++) {
              var randomNumber = Math.floor(Math.random() * chars.length);
              password += chars.substring(randomNumber, randomNumber + 1);
          }

          document.getElementById("password").value = password;
      }

      function copyPassword() {
          var copyText = document.getElementById("password");
          copyText.select();
          copyText.setSelectionRange(0, 999);
          document.execCommand("copy");
      }
      \`\`\`

      # Licence
      This project is licensed under the MIT license. See the **[LICENSE](https://github.com/musarda/Random-Password-Generater/blob/main/LICENSE)** file for more information.
    `,
    cover: "assets/projects/random-password-generator/app.png",
    images: [
      { src: "assets/projects/random-password-generator/app.png", caption: "App" },
      { src: "assets/projects/random-password-generator/generate.png", caption: "Generated password" },
      { src: "assets/projects/random-password-generator/copy.png", caption: "Copy button" },
    ],
    tags: ["Web", "JavaScript", "CSS"],
    language: "JavaScript",
    status: "Completed",
    date: "2023-09",
    repo: "https://github.com/musarda/Random-Password-Generater",
    demo: "",
    featured: false,
    accent: "#34d399",
    code: [
      {
        title: "index.html",
        content: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="style.css">
              <title>musarda | Random Password Generater</title>
          </head>
          <body>
              <div class="body">
                  <div class="box">
                      <h2>Random Password Generater</h2>
                      <input type="text" name="" placeholder="Create password" id="password" readonly>
                      <table>
                          <th><div id="button" class="btn1"onclick="genPassword()">Generate</div></th>
                          <th><a  id="button" class="btn2" onclick="copyPassword()">Copy</a></th>
                      </table>
                  </div>
              </div>
              <script src="./script.js"></script>
          </body>
          </html>
        `,
      },
      {
        title: "style.css",
        content: `
          * {
              margin: 0;
              padding: 0;
              user-select: none;
              box-sizing: border-box;
          }

          body {
              background-color: #212121;
              justify-content: center;
              align-items: center;
              display: flex;
              min-height: 100vh;
          }

          .box {
              background-color: rgb(197, 197, 197);
              padding-top: 30px;
              padding: 30px;
              border-radius: 12px;
          }

          .box h2 {
              margin-bottom: 40px;
              text-align: center;
              font-size: 26px;
              color: #131313;
              font-family: sans-serif;
          }

          input {
              padding: 20px;
              user-select: none;
              height: 50px;
              width: 400px;
              border-radius: 6px;
              border: none;
              border: 2px solid #212121;
              outline: none;
              font-size: 22px;
          }

          input::placeholder {
              font-size: 23px;
          } 

          #button {
              font-family: sans-serif;
              font-size: 15px;

              margin-top: 40px;
              border: 2px solid #212121;
              width: 155px;
              height: 50px;
              text-align: center;
              background-color: #6b6b6b;
              display: flex;
              color: #fff;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              border-radius: 7px;
          } 

          .btn2 {
              margin-left: 85px
          }

          #button:hover {
              color: white;
              background-color: #212121;
          }
        `,
      },
      {
        title: "script.js",
        content: `
          var password = document.getElementById("password");
          function genPassword() {
              var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
              var passwordLength = 12;
              var password = "";
              for (var i = 0; i <= passwordLength; i++) {
                  var randomNumber = Math.floor(Math.random() * chars.length);
                  password += chars.substring(randomNumber, randomNumber + 1);
              }

              document.getElementById("password").value = password;
          }

          function copyPassword() {
              var copyText = document.getElementById("password");
              copyText.select();
              copyText.setSelectionRange(0, 999);
              document.execCommand("copy");
          }
        `,
      },
    ],
  },

  {
    title: "Arduino Digital Thermometer",
    slug: "arduino-digital-thermometer",
    summary: "A simple digital thermometer built with an Arduino UNO, an LM35DZ temperature sensor and a 16x2 LCD.",
    description: `
      <div align="center">

      # Arduino Digital Thermometer

      </div>

      To talk about the construction of a digital thermometer and the working logic of our project, we take our values with the LM35 temperature sensor and reflect the incoming analog data to our LCD screen after making various changes. Before starting the project, I would like to talk about the LM35 temperature sensor.

      ## What is LM35DZ Temperature Sensor?

      <div align="center">
      ![LM35 Temperature Sensor|300](assets/projects/arduino-digital-thermometer/lm35.png)
      </div>

      The LM35DZ sensor reads the temperature and converts it into analog data. Thanks to this data, it allows us to obtain the temperature data of the environment or the device it is integrated with in the code line. This high quality temperature sensor can measure between -55°C and +150°C degrees. As its temperature increases, it also increases the output voltage at the same rate. The LM35DZ has 3 pins. You can find the functions of these legs in the image below.

      <div align="center">
      ![LM35DZ Output Pins|300](assets/projects/arduino-digital-thermometer/lm35dz.png)
      </div>

      <div align="center">

      ## What is a Potentiometer?

      ![What is a Potentiometer?|300](assets/projects/arduino-digital-thermometer/potentiometer.png)
      </div>

      Potentiometer is one of the types of resistors. It allows us to control how much resistance we apply to the circuit. In this application, we calculate how much resistance will be applied to the current going to the LCD.

      <div align="center">
      ![Potentiometer GIF](assets/projects/arduino-digital-thermometer/potentiometer2.gif)
      </div>

      ## Materials Required for Making a Digital Thermometer
      - Jumper Cable
      - Arduino UNO
      - Breadboard
      - LCD Display
      - LM35DZ Temperature Sensor
      - Potentiometer
      - Resistance

      <div align="center">

      ## Thermometer Project Diagram

      ![Thermometer Project Diagram|500](assets/projects/arduino-digital-thermometer/diagram.png)
      </div>

      # Thermometer Project Source Codes

      ## Required Libraries

      A library that includes basic Arduino functions.
      \`\`\`\`ino
      Arduino.h
      \`\`\`\`

      This library is used to control character LCD (Liquid Crystal Display) screens.
      \`\`\`\`ino
      LiquidCrystal.h
      \`\`\`\`

      It is used to support the I2C (Inter-Integrated Circuit) communication protocol. This library is often used to control devices like LCD screens.
      \`\`\`\`ino
      Wire.h
      \`\`\`\`

      \`\`\`\`ino
      #include <Arduino.h>
      #include <LiquidCrystal.h>
      #include <Wire.h>

      int lm35Pin = A0;
      LiquidCrystal lcd(0, 1, 8, 9, 10, 11);

      void setup() {
        lcd.begin(16,2);
        lcd.setCursor(0,0);
        lcd.print("   Heat  ");
        lcd.setCursor(0,1);
        lcd.println(" Calculating ");
        delay(5000);


      }

      void loop() {
        int celsius_value = (5.0 * analogRead(lm35Pin) * 100.0) / 6000;
        lcd.clear();
        lcd.setBacklight(LOW);
        lcd.setCursor(0,0);
        lcd.setCursor(0,1);
        lcd.print(" Heat: ");
        lcd.print(celsius_value);
        lcd.print((char)223);
        lcd.print("C");
        delay(2000);
      }
      \`\`\`\`

      <div align="center">

      ## To Clone This Repository

      </div>

      \`\`\`\`git
      gh repo clone musarda/Arduino-Digital-Thermometer
      \`\`\`\`
    `,
    cover: "assets/projects/arduino-digital-thermometer/diagram.png",
    images: [
      { src: "assets/projects/arduino-digital-thermometer/diagram.png", caption: "Circuit diagram" },
      { src: "assets/projects/arduino-digital-thermometer/arduino-lcd.png", caption: "16x2 LCD display" },
      { src: "assets/projects/arduino-digital-thermometer/lm35dz.png", caption: "LM35DZ pinout" },
      { src: "assets/projects/arduino-digital-thermometer/potentiometer.png", caption: "Potentiometer" },
      { src: "assets/projects/arduino-digital-thermometer/potentiometer2.gif", caption: "Potentiometer" },
    ],
    tags: ["Arduino", "Electronics", "C++"],
    language: "C++",
    status: "Completed",
    date: "2023-08",
    repo: "https://github.com/musarda/Arduino-Digital-Thermometer",
    demo: "",
    featured: false,
    accent: "#2bc4b6",
    code: [
      {
        title: "code.ino",
        content: `
          #include <Arduino.h>
          #include <LiquidCrystal.h>
          #include <Wire.h>

          int lm35Pin = A0;
          LiquidCrystal lcd(0, 1, 8, 9, 10, 11);

          void setup() {
            lcd.begin(16,2);
            lcd.setCursor(0,0);
            lcd.print("   Heat  ");
            lcd.setCursor(0,1);
            lcd.println(" Calculating ");
            delay(5000);
          }

          void loop() {
            int celsius_value = (5.0 * analogRead(lm35Pin) * 100.0) / 6000;
            lcd.clear();
            lcd.setBacklight(LOW);
            lcd.setCursor(0,0);
            lcd.setCursor(0,1);
            lcd.print(" Heat: ");
            lcd.print(celsius_value);
            lcd.print((char)223);
            lcd.print("C");
            delay(2000);
          }
        `,
      },
    ],
  },

  {
    title: "Servo Motor Control with RFID",
    slug: "servo-motor-control-with-rfid",
    summary: "Opens a servo-driven door or gate when an authorized RFID card is scanned, using an Arduino and an MFRC522 reader.",
    description: `
      <div align="center">

      # Hello World! 👋

      </div>

      # Servo Motor Control with RFID
      In this project, an RFID reader is used to read RFID tags and the servo motor is controlled to perform a specific action, such as opening a door or a gate. In this article, we will discuss how to make Servo control with RFID using Arduino.

      # Creating a Clone
      \`\`\`
      gh repo clone musarda/Servo-Motor-Control-with-RFID
      \`\`\`

      ## What is RFID Card?

      > ![RFID|256](assets/projects/servo-motor-control-with-rfid/rfid.png)

      RFID card is a kind of smart card created using Radio Frequency Identification (RFID) technology and can be used for many different purposes. These cards can be recognized and communicated by RFID readers at close range, thanks to a microchip and antenna on them.

      RFID cards are often used for purposes such as authentication, access control, tracking and inventory management. For example, employees in a workplace may need to have RFID cards to enter a particular section. These cards can open the door if people who have access to the department hold their cards to the RFID reader.

      RFID cards can also be used for many different purposes, such as the production process of products, storage and transportation, customer loyalty programs and even animal tracking.

      Here are the steps to follow:

      ## Materials Required
      * Arduino Uno
      * RFID reader (MFRC522)
      * Servo motor
      * Jumper cable
      * Breadboard
      * RFID tags

      ## Wiring
      > ![RFID|512](assets/projects/servo-motor-control-with-rfid/wiring-diagram.png)

      * Connect the VCC and GND pins of the RFID reader to the 3.3V and GND pins of the Arduino board, respectively.
      * Connect the SDA, SCK, MOSI, MISO pins of the RFID reader to the digital pins 10, 13, 11, and 12 of the Arduino board, respectively.
      * Connect the VCC and GND pins of the servo motor to the 5V and GND pins of the Arduino board, respectively.
      * Connect the signal pin of the servo motor to the digital pin 9 of the Arduino board.

      ## Code
      First, you need to install the MFRC522 library. To do that, go to Sketch > Include Library > Manage Libraries in the Arduino IDE, and search for "MFRC522". Install the library and restart the IDE. Then, copy the following code and upload it to your Arduino board.

      * **[Code](https://github.com/musarda/Servo-Motor-Control-with-RFID/blob/main/Code/servo_control.ino)**

      ## Explanation
      The code starts by including the required libraries: \`SPI\`, \`MFRC522\`, and \`Servo\`. Then, it defines some constants, such as the SS_PIN and RST_PIN for the RFID reader and creates instances of the MFRC522 and Servo classes.

      In the \`setup()\` function, the serial communication is initialized, the SPI bus is initialized, the MFRC522 is initialized, and the servo motor is attached to pin 9.
      \`\`\` ino
      void setup() {
        Serial.begin(9600);              // Initialize serial communication
        SPI.begin();                     // Initialize SPI bus
        mfrc522.PCD_Init();              // Initialize MFRC522
        myservo.attach(9);               // Attach servo to pin 9
      }
      \`\`\`
      In the \`loop()\` function, the code checks if a new RFID card is present and reads its UID. If the UID matches the authorized tag UID, the code prints "Authorized access" on the serial monitor, rotates the servo to 180 degrees, waits for a second, and then rotates the servo to 0 degrees. If the UID does not match, the code prints "Unauthorized access" on the serial monitor.

      \`\`\` ino
      void loop() {
        if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
          // Read RFID tag UID
          Serial.print("UID tag :");
          String content = "";
          byte letter;
          for (byte i = 0; i < mfrc522.uid.size; i++) {
            Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
            Serial.print(mfrc522.uid.uidByte[i], HEX);
            content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
            content.concat(String(mfrc522.uid.uidByte[i], HEX));
          }
          Serial.println();
          Serial.print("Message : ");
          content.toUpperCase();

          // Check for authorized tags
          if (content.substring(1) == "YOUR_RFID_TAG_UID") {
            Serial.println("Authorized access");
            myservo.write(180);          // Rotate servo to 180 degrees
            delay(1000);
            myservo.write(0);            // Rotate servo to 0 degrees
          } else {
            Serial.println("Unauthorized access");
          }
        }
      }
      \`\`\`

      ## Testing
      > Once you have uploaded the code to your Arduino board, open the serial monitor (Tools > Serial Monitor) and set the baud rate to 9600. Place an authorized RFID tag near the RFID reader and check if the servo motor rotates to 180 degrees and then to 0 degrees. Then, place an unauthorized RFID tag near the RFID reader and check if the servo motor does not rotate.
    `,
    cover: "assets/projects/servo-motor-control-with-rfid/wiring-diagram.png",
    images: [
      { src: "assets/projects/servo-motor-control-with-rfid/wiring-diagram.png", caption: "Wiring diagram" },
      { src: "assets/projects/servo-motor-control-with-rfid/rfid.png", caption: "MFRC522 RFID reader" },
    ],
    tags: ["Arduino", "RFID", "Electronics"],
    language: "C++",
    status: "Completed",
    date: "2023-04",
    repo: "https://github.com/musarda/Servo-Motor-Control-with-RFID",
    demo: "",
    featured: false,
    accent: "#e879f9",
    code: [
      {
        title: "servo_control.ino",
        content: `
          #include <SPI.h>
          #include <MFRC522.h>
          #include <Servo.h>

          #define SS_PIN 10
          #define RST_PIN 9

          MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance
          Servo myservo;                      // Create Servo instance

          void setup() {
            Serial.begin(9600);              // Initialize serial communication
            SPI.begin();                     // Initialize SPI bus
            mfrc522.PCD_Init();              // Initialize MFRC522
            myservo.attach(9);               // Attach servo to pin 9
          }

          void loop() {
            if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
              // Read RFID tag UID
              Serial.print("UID tag :");
              String content = "";
              byte letter;
              for (byte i = 0; i < mfrc522.uid.size; i++) {
                Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
                Serial.print(mfrc522.uid.uidByte[i], HEX);
                content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
                content.concat(String(mfrc522.uid.uidByte[i], HEX));
              }
              Serial.println();
              Serial.print("Message : ");
              content.toUpperCase();

              // Check for authorized tags
              if (content.substring(1) == "YOUR_RFID_TAG_UID") {
                Serial.println("Authorized access");
                myservo.write(180);          // Rotate servo to 180 degrees
                delay(1000);
                myservo.write(0);            // Rotate servo to 0 degrees
              } else {
                Serial.println("Unauthorized access");
              }
            }
          }
        `,
      },
    ],
  },

  {
    title: "Arduino Rain Sensor",
    slug: "arduino-rain-sensor",
    summary: "A rain / water-level alarm built with an Arduino, a rain sensor and a buzzer.",
    description: `
      <div align="center">

      # Hello World! 👋

      </div>

      # Arduino-Rain-Sensor
      A Rain Sensor Can Be Made Easily With Arduino. You can make it yourself using the following materials

      This Content Also Has A YouTube Video! Don't Forget to Watch! [Code Chain](https://www.youtube.com/@CodeChain)

      # Creating a Clone
      \`\`\`
      gh repo clone musarda/Arduino-Rain-Sensor
      \`\`\`

      # What is a Rain Sensor? How does it work?

      Rain sensor is a type of sensor used in shallow water levels and rainy conditions. The sensor we will use in this project can measure up to 40 mm water level. In the structure of the rain sensor, there are conductor lines connected parallel to each other. When these lines come into contact with water, it sends an analog signal to the Arduino. Apart from Arduino, it also works with many microcontrollers.

      # Water Level / Rain Sensor Features
      > Technicial Specifications

      Features | Outputs
      --- | ---
      **Operating voltage** | 5V
      **Working Current** | <20mA
      **Product Dimensions** | 65x20x8mm
      **Sensor Reading Area** | 40x16mm

      # Water Level / Rain Sensor Connections

      ![Water Level / Rain Sensor|400](assets/projects/arduino-rain-sensor/rain-sensor.png)

      - **GND** : It must be connected to Arduino grounds.
      - **VCC** : It is the Water Level / Rain Sensor power supply that we connect the 5V pin to the Arduino.
      - **DATA** : Where We Get Analog Output.

      # Necessary materials
      * 1x Arduino UNO
      * 1x Breadboard
      * 1x Buzzer
      * 1x Water Level / Rain Sensor
      * 1x 330Ω Resistance
      * Jumper cable

      # Connection Diagram

      ![Circuit_Diagram](assets/projects/arduino-rain-sensor/circuit-diagram.jpg)

      > Connect the VCC pin to the 5V pin on the Arduino and the GND pin to the Ground pin on the Arduino as seen in the circuit diagram above. Connect data pin to A0 pin of Arduino Connect VCC pin of Buzzer to digital pin 8 on arduino
    `,
    cover: "assets/projects/arduino-rain-sensor/circuit-diagram.jpg",
    images: [
      { src: "assets/projects/arduino-rain-sensor/circuit-diagram.jpg", caption: "Connection diagram" },
      { src: "assets/projects/arduino-rain-sensor/rain-sensor.png", caption: "Water level / rain sensor" },
    ],
    tags: ["Arduino", "Electronics"],
    language: "C++",
    status: "Completed",
    date: "2023-03",
    repo: "https://github.com/musarda/Arduino-Rain-Sensor",
    demo: "",
    featured: false,
    accent: "#60a5fa",
    code: [
      {
        title: "Rain_sensor.ino",
        content: `
          int sensorPin = A0;                // The pin to which we will connect the sensor
          int thresholdValue = 100;          // Threshold value for the amount of water
          int buzzerPin = 8;                 // Pin to connect the buzzer
          int data;                          // The value we read from the sensor

          void setup() {
            pinMode(buzzerPin, OUTPUT);      // We set the pin that we connected the buzzer to as OUTPUT.
          }

          void loop() {
            data = analogRead(sensorPin);    // We are reading analog data from the sensor.

            if(data > thresholdValue){           // If the sensor data exceeds the threshold, the codes in the if are applied.
              digitalWrite(buzzerPin, HIGH); 
              delay(100);
              digitalWrite(buzzerPin, LOW);
              delay(100);
            }
            else{                            // If the sensor data is less than the threshold value, the codes in else are applied.
              digitalWrite(buzzerPin, LOW);
            }
          }
        `,
      },
    ],
  },

  {
    title: "Arduino Parking Sensor",
    slug: "arduino-parking-sensor",
    summary: "A parking sensor that beeps faster as objects get closer, using an Arduino and an HC-SR04 ultrasonic sensor.",
    description: `
      <div align="center">

      # Hello World! 👋

      </div>

      # Arduino Parking Sensor
      Making a Parking Sensor with Arduino is Actually Very Simple. You can make it yourself using the following materials

      This Content Also Has A YouTube Video! Don't Forget to Watch! [Code Chain](https://www.youtube.com/@CodeChain) [Video](https://youtu.be/QbnlMhDsDws)

      # Creating a Clone
      \`\`\`
      gh repo clone musarda/Arduino-Parking-Sensor
      \`\`\`

      # What is HC-SR04 Ultrasonic Distance Sensor?
      Designed for use in development boards such as Arduino, this sensor is a distance measurement sensor used in most robotic projects due to its cheapness and ease of use.

      According to the information given by the manufacturer, this sensor can measure between 2 cm and 400 cm with a margin of error of 1%. But if we talk by looking at the user experiences, the most efficient measurement distance is between 2 – 200 cm.

      # HC-SR04 Ultrasonic Distance Sensor Features And Pinouts
      > Technicial Specifications

      Features | Outputs
      --- | ---
      **Operating voltage** | DC 5V
      **Working Current** | 15mA
      **Operating Frequency** | 40KHz
      **Maximum Measurement** | 4m
      **Minimum Measurement** | 2cm
      **Measuring Range** | 3mm
      **Measuring Angle** | 15 degree
      **Trigger Input Signal** | 10µS TTL
      **Dimension** | 45 x 20 x 15 mm

      # HC-SR04 Ultrasonic Sensor Connection

      ![HC-SR04|250](assets/projects/arduino-parking-sensor/hc-sr04.png)

      - **VCC** : It is the power supply for the HC-SR04 Ultrasonic distance sensor, which we connect 5V pin to Arduino.
      - **Trig** : The (Trigger) pin is used to trigger ultrasonic audio signals.
      - **Echo** : pin generates a BPM when the reflected signal is received. The pulse length is proportional to the time it takes to detect the transmitted signal.
      - **GND** : It must be connected to Arduino grounds.

      # Working Principle of Distance Sensor

      The working principle of the HC-SR04 sensor is as follows;

      The signal applied from the Trig pin of the sensor provides an **ultrasonic** sound emission at a frequency of 40 kHz. When this sound wave hits any object and returns to the sensor, the Echo pin becomes active. By measuring the time between these two signals, that is, by detecting the echo of the sound, we can determine the distance of the object from the sensor.

      # Using HC-SR04 Ultrasonic Distance Sensor with Arduino

      Now that we understand the working principle of the ultrasonic distance sensor, we can make a sample project with Arduino.

      Connecting the HC-SR04 to Arduino is quite easy. I recommend placing the sensor on your breadboard. Because in the case of a minor contact, your sensor will not provide accurate data.

      # Necessary materials
      - 1x Arduino UNO
      - 1x Breadboard
      - 1x HC-SR04 ultrasonic distance sensor
      - 1x Buzzer
      - 1x 330Ω Resistance
      - Jumper cable

      # Connection Diagram

      ![Circuit_Diagram](assets/projects/arduino-parking-sensor/circuit-diagram.jpg)

      > Connect the VCC pin to the 5V pin on the Arduino and the GND pin to the Ground pin on the Arduino as seen in the circuit diagram above.
      > Connect the trig pin to the 7th digital pin of the Arduino and the echo pin to the 6th digital pin of the Arduino.

      # Clone
      \`\`\`\`
      gh repo clone musarda/Arduino-Parking-Sensor
      \`\`\`\`
    `,
    cover: "assets/projects/arduino-parking-sensor/circuit-diagram.jpg",
    images: [
      { src: "assets/projects/arduino-parking-sensor/circuit-diagram.jpg", caption: "Connection diagram" },
      { src: "assets/projects/arduino-parking-sensor/hc-sr04.png", caption: "HC-SR04 pinout" },
    ],
    tags: ["Arduino", "HC-SR04", "Electronics"],
    language: "C++",
    status: "Completed",
    date: "2023-03",
    repo: "https://github.com/musarda/Arduino-Parking-Sensor",
    demo: "",
    featured: true,
    accent: "#f97316",
    code: [
      {
        title: "Parking_sensor.ino",
        content: `
          #define echoPin 6
          #define trigPin 7
          #define buzzerPin 8

          int maximumRange = 50;
          int minimumRange = 0;

          void setup() {
            // put your setup code here, to run once:
            pinMode(trigPin, OUTPUT);
            pinMode(echoPin, INPUT);
            pinMode(buzzerPin, OUTPUT);
          }

          void loop() {
            // put your main code here, to run repeatedly:
            int measurement = distance(maximumRange, minimumRange);
            melody(measurement*10);
          }

          int distance(int maxrange, int minrange)
          {
            long duration, distance;

            digitalWrite(trigPin, LOW);
            delayMicroseconds(2);
            digitalWrite(trigPin, HIGH);
            delayMicroseconds(10);
            digitalWrite(trigPin, LOW);

            duration = pulseIn(echoPin, HIGH);
            distance = duration / 58.2;
            delay(50);

            if(distance >= maxrange || distance <= minrange)
              return 0;
              return distance;
          }

          int melody(int dly)
          {
            tone(buzzerPin, 440);
            delay(dly);
            noTone(buzzerPin);
            delay(dly);
          }
        `,
      },
    ],
  },

  {
    title: "Calculating Square Pyramidal Numbers",
    slug: "calculating-square-pyramidal-numbers",
    summary: "A C# console program that prints square pyramidal numbers (1² + 2² + … + n²) step by step.",
    description: `
      # Calculating Square Pyramid Numbers with C#

      - [ Code ](https://github.com/musarda/Calculating-Square-Pyramidal-Numbers/blob/main/code.cs)

      # Output:

      ![Output 1](assets/projects/calculating-square-pyramidal-numbers/output-1.png)

      ![Output 2](assets/projects/calculating-square-pyramidal-numbers/output-2.png)
    `,
    tags: ["C#", "Math", "Console"],
    language: "C#",
    status: "Completed",
    date: "2022-09",
    repo: "https://github.com/musarda/Calculating-Square-Pyramidal-Numbers",
    demo: "",
    featured: false,
    accent: "#a3e635",
    code: [
      {
        title: "code.cs",
        content: `
          using System;

          public class musarda
          {
             static void Main(string[] args)
                  {
                      int toplam = 0;
                      Console.Write("N : ");
                      int n = Convert.ToInt32(Console.ReadLine());
                      for(int i = 1; i <= n; i++)
                      {
                          toplam = 0;
                          for(int j=1;j<=i;j++)
                          {
                              toplam += j * j;
                              Console.Write(j+"^2");
                              if (j != i)
                              {
                                  Console.Write(" + ");
                              }
                              else
                              {
                                  Console.Write(" = ");
                              }
                          }
                          Console.Write(toplam);
                          Console.WriteLine();
                      }
                      Console.ReadKey();
                  }
          }
        `,
      },
    ],
  },

  {
    title: "Calculator",
    slug: "calculator",
    summary: "A console calculator in C++ that adds, subtracts, multiplies and divides two numbers.",
    description: `
      # Making a Calculator with C++

      - [ Code ](https://github.com/musarda/Calculator/blob/main/Calculator.cpp)

      # Output:
      ![Output 1](assets/projects/calculator/output-1.png)

      ![Output 2](assets/projects/calculator/output-2.png)

      ![Output 3](assets/projects/calculator/output-3.png)
    `,
    tags: ["C++", "Console"],
    language: "C++",
    status: "Completed",
    date: "2022-08",
    repo: "https://github.com/musarda/Calculator",
    demo: "",
    featured: false,
    accent: "#f472b6",
    code: [
      {
        title: "Calculator.cpp",
        content: `
          #include <iostream>

          using namespace std;

          int main() {

            double number1 = 0.0, number2 = 0.0, result = 0.0;
            char process = 'x';

            cout << "Created By musarda\\n"; // You can delete this

            cout << "number1 process number2 : ";
            cin >> number1 >> process >> number2;

            switch (process){
              case '+':
              result = number1 + number2;
                break;

              case '-':
              result = number1 - number2;
                break;

              case '*':
              result = number1 * number2;
                break;

              case '/':
              result = number1 / number2;
                break;

              default:
              result = 0;
                break;
            }

            cout << result;

            return 0;
          }
        `,
      },
    ],
  },

  {
    title: "Navbar",
    slug: "navbar",
    summary: "A responsive navigation bar with a dropdown menu and a CSS-only hamburger menu on mobile.",
    description: `
      # Making Navbars with HTML - CSS

      # Code
      - [ index.html ](https://github.com/musarda/Navbar/blob/main/index.html)

      - [ style.css ](https://github.com/musarda/Navbar/blob/main/style.css)

      # Desktop:

      ![Desktop navbar](assets/projects/navbar/desktop-1.png)

      ![Desktop navbar menu](assets/projects/navbar/desktop-2.png)

      # Mobile:

      ![Mobile navbar](assets/projects/navbar/mobile-1.png) ![Mobile navbar menu 1](assets/projects/navbar/mobile-2.png) ![Mobile navbar menu 2](assets/projects/navbar/mobile-3.png)
    `,
    cover: "assets/projects/navbar/desktop-2.png",
    images: [
      { src: "assets/projects/navbar/desktop-2.png", caption: "Desktop with dropdown" },
      { src: "assets/projects/navbar/desktop-1.png", caption: "Desktop" },
      { src: "assets/projects/navbar/mobile-1.png", caption: "Mobile" },
      { src: "assets/projects/navbar/mobile-2.png", caption: "Mobile menu" },
      { src: "assets/projects/navbar/mobile-3.png", caption: "Mobile dropdown" },
    ],
    tags: ["Web", "HTML", "CSS"],
    language: "CSS",
    status: "Completed",
    date: "2022-08",
    repo: "https://github.com/musarda/Navbar",
    demo: "",
    featured: false,
    accent: "#fb7185",
    code: [
      {
        title: "index.html",
        content: `
          <!DOCTYPE html>
          <html lang="en">
           <head>
             <meta charset="UTF-8" />
             <meta http-equiv="X-UA-Compatible" content="IE=edge" />
             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
             <link rel="stylesheet" href="style.css" />
             <title>musarda - navbar</title>
           </head>
           <body>
             <nav class="navbar">
               <!-- Logo -->
               <div class="logo">musarda - navbar</div>
               <!-- Navigation Menu -->
               <ul class="nav-links">
                 <!-- Using Checkbox Hack -->
                 <input type="checkbox" id="checkbox_toggle" />
                 <label for="checkbox_toggle" class="hamburger">&#9776;</label>
                 <!-- Navigations Menus -->
                 <div class="menu">
                   <li><a href="#Home">Home</a></li>
                   <li><a href="#About">About</a></li>
                   <li class="services">
                     <a href="#Services">Services</a>
                     <!-- Dropdown Menu -->
                     <ul class="dropdown">
                       <li><a href="#Dropdown1">Dropdown 1 </a></li>
                       <li><a href="#Dropdown2">Dropdown 2</a></li>
                       <li><a href="#Dropdown3">Dropdown 2</a></li>
                       <li><a href="#Dropdown4">Dropdown 3</a></li>
                       <li><a href="#Dropdown5">Dropdown 4</a></li>
                     </ul>
                   </li>
                   <li><a href="#Pricing">Pricing</a></li>
                   <li><a href="#Contact">Contact</a></li>
                 </div>
               </ul>
             </nav>
           </body>
          </html>
        `,
      },
      {
        title: "style.css",
        content: `
          /* Utilities */
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
          }

          body {
              font-family: cursive;
          }
          a {
              text-decoration: none;
          }

          li {
              list-style: none;
          }


          /* Navbar Stylind Starts */
          .navbar {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 20px;
              background-color: #212121;
              color: #fff;
          }

          .nav-links a {
              color: #fff;
          }

          /* Logo */
          .logo {
              font-size: 19px;
          }

          /* Navbar Menu */
          .menu {
              display: flex;
              gap: 1em;
              font-size: 15px;
          }

          .menu li:hover {
              background-color: #505050;
              border-radius: 5px;
              transition: 0.3s ease;
          }

          .menu li {
              padding: 5px 14px;
          }

          /* Dropdown Menu */
          .services {
              position: relative; 
          }

          .dropdown {
              background-color: #212121;
              padding: 1em 0;
              position: absolute; /* With Respect To Parent */
              display: none;
              border-radius: 8px;
              top: 35px;
          }

          .dropdown li + li {
              margin-top: 10px;
          }

          .dropdown li {
              padding: 0.5em 1em;
              width: 8em;
              text-align: center;
          }

          .dropdown li:hover {
              background-color: #505050;
          }

          .services:hover .dropdown {
              display: block;
          }


          /*Responsive Navbar Menu Stars*/
          /* Ccheckbox Hack */
          input[type=checkbox]{
              display: none;
          } 

          /*Hamburger Menu*/
          .hamburger {
              display: none;
              font-size: 24px;
              user-select: none;
          }

          /*Applying Media Queries*/
          @media (max-width: 768px) {
             .menu { 
              display:none;
              position: absolute;
              background-color: #212121;
              right: 0;
              left: 0;
              text-align: center;
              padding: 16px 0;
             }
             .menu li:hover {
              display: inline-block;
              background-color:#212121;
              transition: 0.3s ease;
             }
             .menu li + li {
              margin-top: 12px;
             }
             input[type=checkbox]:checked ~ .menu{
              display: block;
             }
             .hamburger {
              display: block;
             }
             .dropdown {
              left: 50%;
              top: 30px;
              transform: translateX(35%);
             }
             .dropdown li:hover {
              background-color: #212121;
             }
          }
        `,
      },
    ],
  },

  {
    title: "Scroll Bar",
    slug: "scroll-bar",
    summary: "Customizing the browser scrollbar with plain HTML and CSS.",
    description: `
      # Editing Scrollbars in HTML and CSS

      # Code
      - [ index.html ](https://github.com/musarda/Scroll-Bar/blob/main/index.html)
      - [ style.css ](https://github.com/musarda/Scroll-Bar/blob/main/style.css)
    `,
    tags: ["Web", "CSS"],
    language: "CSS",
    status: "Completed",
    date: "2022-08",
    repo: "https://github.com/musarda/Scroll-Bar",
    demo: "",
    featured: false,
    accent: "#94a3b8",
    code: [
      {
        title: "index.html",
        content: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="stylesheet" href="style.css">
              <title>musarda - scroll bar</title>
          </head>
          <body>
              <p class="p">musarda - scroll bar</p>
          </body>
          </html>
        `,
      },
      {
        title: "style.css",
        content: `
          /* Page Height Required for Scroll Bar to Appear */
          body {
              height: 400vh;
          }

          /* Font Layout */
          p {
              text-align: center;
              font-size: 30px;
          }

          /* Scrollbar Width */
          ::-webkit-scrollbar {
              width: 10px;
          }

          /* Scrollbar Background Color */
          ::-webkit-scrollbar-track {
              background: #dddd;
          }

          /* Scroll Bar Color */
          ::-webkit-scrollbar-thumb {
              background: #212121;
              border-radius: 20px;
          }
        `,
      },
    ],
  },

];
