# Reimbursement Platform
The aim of this project is to develop a centralized, automated platform that will make the reimbursement process more efficient and less labor-intensive. This will not only save time for both the engineers and the operations team, but will also reduce the chances of manual errors in the process.

## Running the backend
We recommend using a virtual environment to run the backend server. Make sure you're using a version of Python that is compatible with the project. We suggest Python 3.10. Likewise, you'll need to have postgres installed on your machine, which can be done using [this installation guide](https://wiki.postgresql.org/wiki/Homebrew) if you're using a Mac.

Clone the repository and head to the base directory of the project. Run the following commands to start the backend server:

    cd backend
    pip install -r requirements.txt

Once this is done you'll want to install the pre-commit hooks, which will run the linters before every commit.

    pre-commit install

Finally, in order to get the backend up:

    cd ..
    uvicorn backend.main:app --reload --port 8080

You can always change the port number to whatever you'd like. Make sure you're running everything from the root directory.
