'use client';

import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import NoSong from './NoSong';
import type { SpotifyAPIResponse } from '~/lib/types';

const limit = (str: string) => {
    if (!str) return '';
    if (str.length > 15) {
        return str.substring(0, 15) + "...";
    }
    return str;
};

const firstp = (str: string) => {
    if (!str) return '';
    const index = str.indexOf("(");
    return index === -1 ? str : str.substring(0, index);
};

export const SpotifyWrapper = () => {
    const [currentSong, setCurrentSong] = useState<SpotifyAPIResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCurrentSong = async () => {
        try {
            console.log('Fetching Spotify data...');
            const response = await fetch('/api/spotify', {
                cache: 'no-store'
            });
            
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            if (response.ok && response.headers.get('Content-Type')?.includes('application/json')) {
                const data = await response.json();
                console.log('Received data:', data);

                // Check if we're actually playing something
                if (data && data.is_playing === false) {
                    console.log('No song currently playing');
                    setCurrentSong(null);
                    return;
                }

                if (data && data.item && data.item.name) {
                    console.log('Valid song data received');
                    if (!currentSong || currentSong.item.id !== data.item.id) {
                        setCurrentSong(data);
                    }
                } else {
                    console.log('Invalid response structure:', data);
                    setCurrentSong(null);
                }
            } else {
                const errorText = await response.text();
                console.log('API Error:', errorText);
                setCurrentSong(null);
            }
        } catch (error) {
            console.error('Error fetching Spotify data:', error);
            setCurrentSong(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentSong();
        const intervalId = setInterval(fetchCurrentSong, 5000);
        return () => clearInterval(intervalId);
    }, []);

    // Add debugging log for currentSong state
    useEffect(() => {
        console.log('Current song state:', currentSong);
    }, [currentSong]);

    if (isLoading) {
        return <div>Loading...</div>; // Added loading indicator
    }

    if (!currentSong || !currentSong.item) {
        console.log('Rendering NoSong component');
        return <NoSong />;
    }

    const { item } = currentSong;
    const name = limit(item.name);

    if (!item.album?.images?.[0]?.url || !item.album.name || !item.artists?.[0]?.name) {
        console.log('Missing required song data');
        return <NoSong />;
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="bg-gray-900 text-gray-50 px-4 py-2 rounded-full flex items-center cursor-pointer hover:bg-gray-800">
                    <svg
                        className="mr-4"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#1ED760"
                            fillRule="evenodd"
                            d="M19.0983701,10.6382791 C15.230178,8.34118115 8.85003755,8.12986439 5.15729493,9.25058527 C4.56433588,9.43062856 3.93727638,9.09580812 3.75758647,8.50284907 C3.57789655,7.90953664 3.91236362,7.28283051 4.50585273,7.10261054 C8.74455585,5.81598127 15.7909802,6.06440214 20.2440037,8.70780512 C20.7774195,9.02442687 20.9525156,9.71332656 20.6362472,10.2456822 C20.3198021,10.779098 19.6305491,10.9549008 19.0983701,10.6382791 M18.971686,14.0407262 C18.7004726,14.4810283 18.1246521,14.6190203 17.6848801,14.3486903 C14.4600027,12.3664473 9.54264764,11.792217 5.72728477,12.9503953 C5.23256328,13.0998719 4.70992535,12.8208843 4.55974204,12.3270462 C4.41061884,11.8323247 4.68978312,11.3107469 5.18362118,11.1602103 C9.5419409,9.83771368 14.9600247,10.4782013 18.6638986,12.7544503 C19.1036707,13.0253103 19.242016,13.6013075 18.971686,14.0407262 M17.5034233,17.308185 C17.2876894,17.6617342 16.827245,17.7725165 16.4749326,17.5571359 C13.6571403,15.8347984 10.1101639,15.4459119 5.93312425,16.4000177 C5.53063298,16.4922479 5.12937851,16.2399399 5.03767834,15.8376253 C4.94544812,15.4351341 5.19669597,15.0338796 5.60024736,14.9420027 C10.1712973,13.8970803 14.0923186,14.3467468 17.2551791,16.2796943 C17.6078449,16.4948982 17.7189805,16.9556959 17.5034233,17.308185 M12,0 C5.37267547,0 0,5.37249879 0,11.9998233 C0,18.6278546 5.37267547,24 12,24 C18.6275012,24 24,18.6278546 24,11.9998233 C24,5.37249879 18.6275012,0 12,0"
                        />
                    </svg>
                    <span className="text-sm font-medium">{name}</span>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4 rounded-lg bg-gray-800 text-gray drop-shadow-lg border-black shadow-black">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold">Currently Listening</h4>
                </div>
                <div className="space-y-2">
                    <div className="flex flex-row md:flex-row">
                        <img
                            alt="Album Cover"
                            className="rounded-md m-2"
                            height={100}
                            src={item.album.images[0].url}
                            width={100}
                        />
                        <div className="flex flex-col m-2">
                            <h2 className="flex flex-wrap text-xl md:text-2xl lg:text-3xl font-bold">
                                {firstp(item.name)}
                            </h2>
                            <p className="text-gray-400 text-sm">Album: {item.album.name}</p>
                            <p className="text-gray-400 text-md">{item.artists[0].name}</p>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};