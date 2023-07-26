export const createError = (status,messgae) => {
    const err = new Error();
    err.status = status;
    err.message = messgae
    return err
}