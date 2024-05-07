from fastapi import FastAPI
from api.endpoints import event, reimbursement, authentication
import settings as sett
import uvicorn
import logging
from starlette.routing import Route

logger = logging.getLogger(__name__)

app = FastAPI(lifespan=sett.lifespan, middleware=sett.middleware, 
              exception_handlers={Exception: sett.unicorn_exception_handler})

app.include_router(authentication.router, tags=["Authentication"])
app.include_router(event.router, tags=["Events"])
app.include_router(reimbursement.router, tags=["Reimbursement"])

if __name__ == '__main__':
    config = uvicorn.Config(app, port=8080, reload=True, log_level="info", log_config="config.yml")
    server = uvicorn.Server(config)
    server.run()