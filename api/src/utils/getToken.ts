
/**
 * Extracts the 'token' value from the provided cookies string.
 * 
 * This function parses the cookies string to find the 'token' cookie
 * and returns its value. If the 'token' cookie is not found, it returns undefined.
 *
 * @param cookies - A string containing all the cookies sent with the request.
 * @returns The value of the 'token' cookie, or undefined if the cookie is not present.
 */

export const getToken = (cookies: string) => {
    const cookieArr = cookies.split(';');

    for (let i = 0; i < cookieArr.length; i++) {

        if (cookieArr[i].startsWith('token')) {
            return cookieArr[i].slice(6,)
        }

    }
}