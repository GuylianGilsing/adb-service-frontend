export default {
    _url: "",

    append(key, value)
    {
        if(this._url.length == 0)
        {
            this._url += `?${key}=${value}`
        }
        else
        {
            this._url += `&${key}=${value}`
        }
    },

    get()
    {
        return this._url;
    },

    clear()
    {
        this._url = "";
    }
}
