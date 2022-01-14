import request from "./../functions/Request";
import AxiosClient from "./clients/AxiosClient";
import SearchURLCreator from "../functions/SearchURLCreator";

export default class RollerCoasterService
{
    async getAll()
    {
        const [response, error] = await request(AxiosClient.get(`/rollercoaster`));

        if(error !== null || (response !== null && response.status !== 200))
        {
            return [];
        }

        return response.data;
    }

    async get(id)
    {
        const [response, error] = await request(AxiosClient.get(`/rollercoaster/${id}`));

        if(error !== null || (response !== null && response.status !== 200))
        {
            return null;
        }

        return response.data;
    }

    async search(name = "", park = "")
    {
        const searchURL = this._createSearchURL(name, park);
        const [response, error] = await request(AxiosClient.get(`/rollercoaster/search/${searchURL}`));

        if(error !== null || (response !== null && response.status !== 200))
        {
            return [];
        }

        return response.data;
    }

    _createSearchURL(name = "", park = "")
    {
        SearchURLCreator.clear();

        if(name.length > 0)
            SearchURLCreator.append("name", name);

        if(park.length > 0)
            SearchURLCreator.append("park", park);

        return SearchURLCreator.get();
    }
}
