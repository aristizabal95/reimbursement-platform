Make sure you have node js installed.

from the reimbursment-admin directory run
$ npm i packages
$ npm run dev

from the reimbursment-server
$ source env/bin/activate
$ pip install -r requirements.txt
$ uvicorn main:app --reload --port 8080
