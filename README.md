# Python in Persian

[![Documentation Status](https://readthedocs.org/projects/pythonpersiantutorial/badge/?version=latest)](https://readthedocs.org/projects/pythonpersiantutorial/?badge=latest)

This is an open-source and online book that provides a comprehensive tutorial on the Python programming language in Persian. The book is available at [python.coderz.ir](https://python.coderz.ir/) and covers a wide range of topics, including:

- Introduction
- Setup and starting a new project
- Data types
- Control flow statements
- Functions
- Object-oriented programming
- Exception handling
- File handling
- Regular expressions
- Debugging techniques
- Date and Time

This book is designed for Persian-speaking learners who have no prior experience with programming languages. The book covers all the essential topics, from basic to intermediate programming, and each chapter includes code examples to help learners reinforce their understanding of the material.

## Getting Started

To get started with the book:

- Simply visit [python.coderz.ir](https://python.coderz.ir/) and start reading. 

- Download the source code from GitHub and run it on your local machine:

  ```
  $ git clone https://github.com/saeiddrv/PythonPersianTutorial.git
  
  $ pip install -U pip
  $ pip install virtualenv
  $ python -m virtualenv .pypr-venv
  $ source .pypr-venv/bin/activate
  
  $ cd PythonPersianTutorial
  $ pip install -r requirements.txt
  
  $ make html
  
  $ cd ./build/html
  $ python -m http.server
  ```
  
- Download the source code from GitHub and run it with Docker:
  
  ```
  $ git clone https://github.com/saeiddrv/PythonPersianTutorial.git
  
  $ cd PythonPersianTutorial
  
  $ docker build -t pypersian .
  $ docker run -d --name pypersian -p 80:8000 pypersian
  ```
 

## Contributions

If you'd like to contribute to the book, you can fork the repository on GitHub and submit a pull request with your changes. You can also open an issue to **report errors**.

## Credits

This book was authored by **Saeid Darvish**.

## License

This book is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0](http://creativecommons.org/licenses/by-nc/4.0/) International Public License, which means you can use, copy, modify, merge, publish, distribute of the book for non-commercial purposes.

## Acknowledgments

Special thanks to the Python community and the contributors of open-source Python packages and libraries, without whom this book would not have been possible.

