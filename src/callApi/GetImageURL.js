

const getImgUrl = async (image) => {
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_api_key}`;
    const formData = new FormData()
    if (image) {
        formData.append('image', image)
        const response = await fetch(url, {
        method: 'POST',
        body: formData,
    })
    const data = await response.json()
    return data;
    }
};

export default getImgUrl;
