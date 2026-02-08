from passlib.context import CryptContext

# CHANGED: We are using "argon2" instead of "bcrypt" to fix the crash
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)