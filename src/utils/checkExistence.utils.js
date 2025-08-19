export const throwIfExists = async (checkFunciont,errorMessage ="Resource already exist") => {
    const exists = await checkFunciont();
    if (exists) throw new Error(errorMessage);
    return false
}

export const throwIfNotfound= async (checkFunction, errorMessage = "Resource not found") => {
    const item = await checkFunction();
    if (!item) throw new Error(errorMessage);
    return item;
}