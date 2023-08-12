interface fetchModel {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    parameter: string;
    callback?: Function;
}

export async function fetchApi({ method, parameter, callback }: fetchModel) {
    try {
        const request = await fetch(parameter, { method })
        const response = await request.json();
        callback && callback(response)
        return response
    } catch (error) {
        callback && callback(error)
        return error
    }
}

export async function getBlogPost(params?: string) {
    const post = await fetchApi({ method: 'GET', parameter: `https://tahsinbey.com/wp-json/wp/v2/${params ? `posts?slug=${params}` : 'posts/'}` })

    return post
}