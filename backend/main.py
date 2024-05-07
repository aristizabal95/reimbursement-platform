from fastapi import FastAPI
import settings as sett
import uvicorn
import logging

logger = logging.getLogger(__name__)

app = FastAPI(lifespan=sett.lifespan, middleware=sett.middleware, 
              exception_handlers={Exception: sett.unicorn_exception_handler})

if __name__ == '__main__':
    config = uvicorn.Config("main:app", port=8080, reload=True, log_level="info", log_config="config.yml")
    server = uvicorn.Server(config)
    server.run()
