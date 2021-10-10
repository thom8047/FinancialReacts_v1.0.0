import PyPDF2 as pdf
import json
import os

# GLOBAL RECIEVED VARIABLES
# Needs to be updated with:
#     - Scraping the third page, which seems to always be the third
#     - Reading Checking and Savings files
#     - Adding account ending number to transaction data
#


class PDFParser:
    def __init__(self, path=None):
        self.transJSON = open('transaction.json', 'r')
        self.exitProgram = False
        self.path = path

        # INIT Values for parsing
        self.currentPDF = open(self.path, 'rb')
        self.pdfReader = pdf.PdfFileReader(self.currentPDF)

        # Need an if to check if our json data contains this info
        try:
            self.financialDict = json.load(self.transJSON)
            # used to close and re-open and clear out the json file
            self.transJSON.close()
            self.transJSON = open('transaction.json', 'w')

        except json.JSONDecodeError:
            print("empty file, continue")

    def parseAgain(self):
        for page in range(self.pdfReader.getNumPages()):
            if not (page):
                pass
            else:
                self.parse(page)
            # pageObj = self.pdfReader.getPage(page)

    def parse(self, pageNum=0):
        parsedAgain = False if not pageNum else True

        pageObj = self.pdfReader.getPage(pageNum)
        text = pageObj.extractText()
        iterTrack = 0
        transHistStart = 0

        # Now lets config transaction data and add in new statement on first parse
        if not parsedAgain:
            self.currentSub = self.financialDict["transaction_data"]["submissions"]
            self.currentAcc = self.financialDict["transaction_data"]["accounts"]
            self.financialDict[f"Statement{self.currentSub}"] = {}
            self.statement = self.financialDict[f"Statement{self.currentSub}"]

        for line in text.split('\n'):
            if self.exitProgram:
                break

            if (iterTrack == 2 and not parsedAgain):
                self.statement["ACCOUNTNUMBER"] = line
                if not (line in self.currentAcc):
                    self.currentAcc.append(line)

            if (iterTrack == 4 and not parsedAgain):
                _from, to = line.split(' ')[0], line.split(' ')[2]
                for key, value in self.financialDict.items():
                    if (key == "transaction_data") or (key == f"Statement{self.currentSub}"):
                        continue
                    if value["FROM"] == _from:
                        # remove our current statement dictionary and exit program
                        self.exit(0)
                        break

                self.statement["FROM"] = _from
                self.statement["TO"] = to

            if ("TOTAL PURCHASES, BALANCE TRANSFERS & OTHER CHARGES FOR THIS PERIOD" in line):
                self.write(text.split('\n')[transHistStart+1:iterTrack])
                self.save()
                break
            if ("Purchases, Balance Transfers & Other Charges" in line):
                transHistStart = iterTrack
            if ("Detach and mail with check payable to" in line):
                self.write(text.split('\n')[transHistStart+1:iterTrack])
                self.parseAgain()
                break

            iterTrack += 1

    def write(self, transac):
        loopInLoop = 0
        transDictionary = {}
        numberOfTrans = int(len(transac)/5)
        self.statement["transaction"] = [] if not (
            "transaction" in self.statement.keys()) else self.statement["transaction"]

        for a in range(numberOfTrans):
            # We need to split this here as a 5 bit dictionary as transaction1, transaction2, ... etc.
            transDictionary = {
                "TRANS_DATE": transac[a+loopInLoop],
                "POST_DATE": transac[a+loopInLoop + 1],
                "REF_ID": transac[a+loopInLoop + 2],
                "DESCR": transac[a+loopInLoop + 3],
                "CHARGE": transac[a+loopInLoop + 4],
            }

            self.statement["transaction"].append(transDictionary)

            # reset
            transDictionary = {}
            loopInLoop += 4

    def save(self):
        # Now increment the number of statements
        self.financialDict["transaction_data"]["submissions"] = int(
            self.currentSub)+1

        json.dump(self.financialDict, self.transJSON, indent=4)
        self.close()

    def close(self):
        self.transJSON.close()
        # self.currentPDF.close()

    def exit(self, error=0):
        self.exitProgram = True
        if error == 0:  # this error corresponds to being a copy
            error_message = "\nStatement has already been uploaded, please upload different different file...\n"
            self.financialDict.pop(f"Statement{self.currentSub}")

        print(error_message)
        json.dump(self.financialDict, self.transJSON, indent=4)

        self.close()


directory = "C:/Users/kedwa/Desktop/statements/"

for file in os.listdir(directory):
    pathway = directory+file
    obj = PDFParser(pathway)
    obj.parse()
