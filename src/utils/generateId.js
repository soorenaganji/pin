export const generateId = () => {
    const id = Math.floor(Math.random() * 1000 * 1000) // Generates a six digit random number
    return id
}