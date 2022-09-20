import { ForAxiosDefs } from "../../commonTypes";

interface FetchProps {
    path: string;
    params?: Record<string, string>;
    method: ForAxiosDefs;
    payload: string | null;
    contentType?: string;
}

export const fetchCall = async (props: FetchProps) => {
    try {
        const options: Record<string, any> = { mode: "cors" };

        if (props.contentType) {
            options["headers"] = { accepts: props.contentType };
        }

        const response = await fetch(props.path, options);
        return response.json();
    } catch (err) {
        const error = err as Error;
        throw new Error(error.message);
    }
};
