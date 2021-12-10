# Financial _React_

A financial application built with the speed of React.

The application uses a PDF parser, built in python, that reads checking, savings, and credit statements from Well's Fargo.

---

### Why

Well's Fargo has an API for accessing account transactions, it can be found at the [Wells Fargo Gateway](https://developer.wellsfargo.com/) website. This service:

- Costs money
- Is not available for individuals
- Does allow an individual to apply as a business, but will likely decline services without proper documentation

Because of this issue of not having a way to access transactions in any format, besides PDF, I created the python scripts and a front end to read and display it all. The python parser reads the PDF statements and generates json data with statements split up by month, as they are in the PDF's. The only thing needing changed would be a blacklist of statements, and a list of incomes. This isn't the best way, but debit and checking statements cannot be read with withdrawl/deposits being captured. This is a huge hole and would love anyone's input/solution for the case.

### PREREQUISITES

- Well's fargo statements
- Typescript | React front-end
- Python knowledge
