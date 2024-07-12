import { StackDivider, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

const mapboxClient = mbxGeocoding({
    accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
});

type SuggestionType = {
    placeName: string;
    coordinates: number[];
};

const AddressSuggestion = ({
    text,
    suggestionOnClick,
}: {
    text: string;
    suggestionOnClick: (addressString: SuggestionType) => void;
}) => {
    const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await mapboxClient
                    .forwardGeocode({
                        query: text,
                        limit: 5,
                    })
                    .send();
                let filtered = response.body.features
                    .filter((item) => item.place_type[0] === "address")
                    .map((item) => ({
                        placeName: item.place_name,
                        coordinates: item.center,
                    }));
                setSuggestions(filtered);
            } catch (error) {
                toast.error("Cannot fetch address suggestons");
            }
        })();
    }, [text]);
    return (
        suggestions.length !== 0 && (
            <div className="w-full absolute bg-gray-300 z-10 left-0 top-full">
                <VStack
                    divider={<StackDivider />}
                    p={2}
                    alignItems={"flex-start"}
                >
                    {" "}
                    {suggestions.map((suggestion) => (
                        <Text cursor={"pointer"}
                            noOfLines={1}
                            key={suggestion.placeName}
                            onClick={() => {
                                suggestionOnClick(suggestion);
                                setSuggestions([]);
                            }}
                        >
                            {suggestion.placeName}
                        </Text>
                    ))}
                </VStack>
            </div>
        )
    );
};

export default AddressSuggestion;
