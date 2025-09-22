import bcrypt from 'bcrypt';

export async function hashPass(password) {
    return await bcrypt.hash(password, 10);
}

export async function verifyPass(inputPass, hashedPass) { 
    return await bcrypt.compare(inputPass, hashedPass);
}