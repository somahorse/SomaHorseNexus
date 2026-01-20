from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
async def test():
    return {"message": f"This is {__name__} speaking"}